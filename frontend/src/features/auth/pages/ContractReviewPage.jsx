import { Link } from "react-router-dom";

const STATUS_STYLES = {
    reviewed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    processing: "bg-amber-50 text-amber-700 border-amber-200",
    failed: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function ContractCard({ contract, onDelete }) {
    const statusClass =
        STATUS_STYLES[contract.status] ||
        "bg-slate-100 text-slate-700 border-slate-200";

    const formattedSize = contract.fileSize
        ? `${(contract.fileSize / 1024).toFixed(1)} KB`
        : "—";

    const formattedDate = contract.createdAt
        ? new Date(contract.createdAt).toLocaleDateString()
        : "—";

    return (
        <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-xs sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="truncate text-base font-semibold text-slate-900">
                        {contract.fileName}
                    </h3>
                    <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusClass}`}
                    >
                        {contract.status || "uploaded"}
                    </span>
                </div>

                <p className="mt-1.5 text-xs text-slate-500">
                    Size: {formattedSize} · Uploaded: {formattedDate}
                </p>
            </div>

            <div className="flex shrink-0 items-center gap-2.5">
                <Link
                    to={`/contracts/${contract.id}/review`}
                    state={{ contract }}
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                    Review Contract
                </Link>

                <button
                    type="button"
                    onClick={() => onDelete(contract.id)}
                    className="rounded-lg border border-rose-200 bg-white px-3.5 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}