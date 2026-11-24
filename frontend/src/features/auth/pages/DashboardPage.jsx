import { useState, useEffect } from "react";
// import ContractUpload from "../../contracts/components/ContractUpload";
import ContractUpload from "../components/ContractUpload";
// import { UserButton } from "@clerk/react";
import useApi from "../../../hooks/useApi";

import { UserButton, useAuth, useClerk } from "@clerk/react";

function DashboardPage() {
  const { apiRequest } = useApi();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reviewingId, setReviewingId] = useState(null);
  const [reviews, setReviews] = useState({});
  const [contracts, setContracts] = useState([]);
  const { getToken } = useAuth();
  const { signOut } = useClerk();
  const showToken = async () => {
    const token = await getToken();
    console.log(token);
  };

  //Handle Delete Request--------------
  const handleDeleteContract = async (contractId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this contract?"
    );

    if (!confirmed) return;

    try {
      await apiRequest({
        method: "DELETE",
        url: `/contracts/${contractId}`,
      });

      // Remove the deleted contract from the UI
      setContracts((prev) =>
        prev.filter((contract) => contract.id !== contractId)
      );
    } catch (error) {
      console.error("Delete contract error:", error);

      alert(
        error.response?.data?.message ||
        "Unable to delete contract."
      );
    }
  };

  //Ai generated Review
  const handleReviewContract = async (contractId) => {
    try {
      setReviewingId(contractId);

      const response = await apiRequest({
        method: "POST",
        url: `/contracts/${contractId}/review`,
      });

      setReviews((prev) => ({
        ...prev,
        [contractId]: response.data.findings,
      }));
    } catch (error) {
      console.error("Review error:", error);

      alert(
        error.response?.data?.message ||
        "Unable to review contract."
      );
    } finally {
      setReviewingId(null);
    }
  };

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiRequest({
          method: "GET",
          url: "/contracts",
        });

        setContracts(response.data.contracts);
      } catch (error) {
        setError(
          error.response?.data?.message ||
          "Unable to load your contracts."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, [apiRequest]);

  const testBackend = async () => {
    try {
      setLoading(true);

      const response = await apiRequest({
        method: "GET",
        url: "/protected",
      });

      setMessage(response.data.message);
      console.log(response.data);
      //       const response = await apiRequest({
      //   method: "GET",
      //   url: "/auth/me",
      // });

      // console.log(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage("Backend authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:px-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              IntelliBooks Dashboard
            </h1>
            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
              Manage contracts and run AI clause reviews
            </p>
          </div>

          <div className="flex items-center gap-3">
            <UserButton />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              onClick={testBackend}
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-xs transition hover:bg-blue-700 disabled:opacity-50 sm:w-auto"
            >
              {loading ? "Testing..." : "Test Backend Authentication"}
            </button>

            <button
              onClick={showToken}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 sm:w-auto"
            >
              get session token
            </button>
          </div>

          {message && (
            <p className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
              {message}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <ContractUpload
            onUploadSuccess={(newContract) => {
              setContracts((prev) => [newContract, ...prev]);
            }}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
              Your Contracts
            </h2>
            {contracts.length > 0 && (
              <span className="rounded-full bg-slate-200/70 px-3 py-1 text-xs font-medium text-slate-700">
                {contracts.length}
              </span>
            )}
          </div>

          {loading && (
            <p className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-xs">
              Loading your contracts...
            </p>
          )}

          {error && (
            <p className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          {!loading && !error && contracts.length === 0 && (
            <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
              You haven't uploaded any contracts yet.
            </p>
          )}

          {!loading && contracts.length > 0 && (
            <div className="space-y-4">
              {contracts.map((contract) => (
                <div
                  key={contract.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 sm:p-6"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <h3 className="wrap-break-word text-base font-semibold text-slate-900 sm:text-lg">
                        {contract.fileName}
                      </h3>

                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 sm:text-sm">
                        <span>{(contract.fileSize / 1024).toFixed(2)} KB</span>
                        <span>•</span>
                        <span>
                          {new Date(contract.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      Status: {contract.status}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
                    <button
                      onClick={() => handleDeleteContract(contract.id)}
                      className="w-full rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 sm:w-auto"
                    >
                      Delete Contract
                    </button>

                    <button
                      onClick={() => handleReviewContract(contract.id)}
                      disabled={reviewingId === contract.id}
                      className="w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-xs transition hover:bg-blue-700 disabled:opacity-50 sm:w-auto"
                    >
                      {reviewingId === contract.id
                        ? "Reviewing..."
                        : "Review Contract"}
                    </button>
                  </div>

                  {reviews[contract.id] && (
                    <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                      {reviews[contract.id].map((finding) => (
                        <div
                          key={finding.checklistItem}
                          className="rounded-xl border border-slate-200/90 bg-slate-50 p-4"
                        >
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <h4 className="text-sm font-semibold text-slate-900 sm:text-base">
                              {finding.checklistItem}
                            </h4>

                            <p className="text-xs font-semibold text-slate-700 sm:text-sm">
                              Status: {finding.status}
                            </p>
                          </div>

                          <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                            {finding.summary}
                          </p>

                          {finding.quote && (
                            <details className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
                              <summary className="cursor-pointer text-xs font-medium text-blue-600 hover:underline sm:text-sm">
                                View clause
                              </summary>

                              <p className="mt-2 wrap-break-word text-xs leading-relaxed text-slate-800 sm:text-sm">
                                {finding.fullClause || finding.quote}
                              </p>

                              <p className="mt-2 text-xs text-slate-500">
                                {finding.pageNumber
                                  ? `Page ${finding.pageNumber}`
                                  : finding.sectionName || "Location unavailable"}
                              </p>
                            </details>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;