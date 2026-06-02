import StatusBadge from "./StatusBadge";

export default function PaperCard({ paper, onClick }) {
  return (
    <div
      onClick={onClick}
      className="border p-4 rounded-xl shadow hover:shadow-lg cursor-pointer"
    >
      <h2 className="text-lg font-semibold">{paper.title}</h2>

      <p className="text-sm text-gray-600 mt-2">
        {paper.abstract?.slice(0, 100)}...
      </p>

      <div className="mt-3 flex justify-between items-center">
        <StatusBadge status={paper.status} />
        <span className="text-xs text-gray-400">
          {new Date(paper.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}