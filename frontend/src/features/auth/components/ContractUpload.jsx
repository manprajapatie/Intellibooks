import { useState } from "react";
import useApi from "../../../hooks/useApi"
// import useApi from "../../../hooks/useApi";

function ContractUpload({ onUploadSuccess }) {
  const { apiRequest } = useApi();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a contract file.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);

      const response = await apiRequest({
        method: "POST",
        url: "/contracts/upload",
        data: formData,
      });

      onUploadSuccess?.(response.data.contract);
      setFile(null);

      e.target.reset();
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Unable to upload contract. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-xl font-semibold">
        Upload a Contract
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Upload your contract for AI-powered review.
      </p>

      <form onSubmit={handleUpload} className="mt-5">
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={(e) => setFile(e.target.files[0] || null)}
          className="block w-full rounded-lg border border-gray-300 p-3 text-sm"
        />

        <p className="mt-2 text-xs text-gray-500">
          PDF, DOCX or TXT. Maximum file size: 20 MB.
        </p>

        {error && (
          <p className="mt-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !file}
          className="mt-5 rounded-lg bg-black px-5 py-2.5 text-white disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload Contract"}
        </button>
      </form>
    </div>
  );
}

export default ContractUpload;
