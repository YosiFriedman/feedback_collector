type FeedbackCardProps = {
  id: string;
  name: string;
  comment: string;
  rating: number;
  created_at: string;
  flagged?: boolean;
  sentiment?: "positive" | "neutral" | "negative";
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
  onFlag?: (id: string) => void;
};

export default function FeedbackCard({
  id,
  name,
  comment,
  rating,
  created_at,
  flagged,
  sentiment,
  isAdmin = false,
  onDelete,
  onFlag,
}: FeedbackCardProps) {
  const sentimentColor = {
    positive: "text-green-600 bg-green-100",
    neutral: "text-gray-600 bg-gray-100",
    negative: "text-red-600 bg-red-100",
  };

  return (
    <div className="relative border rounded-xl bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-lg hover:shadow-2xl transition-shadow duration-200 p-6 w-full max-w-md mx-auto group">
      <div className="flex items-center gap-4 mb-2 mt-2">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
          <p className="text-xs text-gray-400">{new Date(created_at).toLocaleDateString()}</p>
        </div>
        {flagged && (
          <span className="text-xs text-red-500 font-medium whitespace-nowrap flex items-center gap-1">
            <span>⚠️</span> Flagged
          </span>
        )}
      </div>

      <p className="text-gray-800 text-base mb-2 leading-relaxed">{comment}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1">
          <span className="text-yellow-400 text-lg">★</span>
          <span className="text-sm font-medium text-gray-700">{rating}/5</span>
        </div>

        {sentiment && (
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              sentimentColor[sentiment]
            }`}
          >
            {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
          </span>
        )}
      </div>

      {isAdmin && (
        <div className="flex gap-4 mt-4 border-t pt-3">
          <button
            className="text-sm text-orange-600 hover:underline hover:text-orange-800 transition"
            onClick={() => onFlag?.(id)}
          >
            Flag
          </button>
          <button
            className="text-sm text-red-600 hover:underline hover:text-red-800 transition"
            onClick={() => onDelete?.(id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}