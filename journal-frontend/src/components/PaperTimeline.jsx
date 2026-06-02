export default function PaperTimeline({ timeline = [] }) {
  return (
    <div className="border-l-2 border-gray-300 pl-4 space-y-3">
      {timeline.map((t, i) => (
        <div key={i}>
          <p className="text-sm font-medium">{t.action}</p>
          <p className="text-xs text-gray-500">
            {new Date(t.date).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}