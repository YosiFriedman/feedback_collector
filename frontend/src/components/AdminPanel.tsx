import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchFeedbacks, deleteFeedback, flagFeedback } from "@/lib/api";
import type { Feedback } from "@/types/feedback";

export default function AdminPanel() {
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: fetchFeedbacks,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFeedback,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["feedbacks"] }),
  });

  const flagMutation = useMutation({
    mutationFn: flagFeedback,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["feedbacks"] }),
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Failed to load feedback</p>;

  return (
    <div className="space-y-4 max-w-4xl mx-auto p-4">
      {data?.map((fb: Feedback) => (
        <div key={fb.id} className="border p-4 rounded bg-white shadow">
          <div className="flex justify-between">
            <div>
              <p className="font-semibold">{fb.name} ({fb.email})</p>
              <p>{fb.comment}</p>
              <p className="text-sm text-yellow-600">Rating: {fb.rating}</p>
              {fb.flagged && <p className="text-sm text-red-500 font-medium">⚠️ Flagged</p>}
            </div>
            <div className="flex flex-col gap-2">
              <button
                className="text-sm text-orange-600 hover:underline"
                onClick={() => flagMutation.mutate(fb.id)}
              >
                Flag
              </button>
              <button
                className="text-sm text-red-600 hover:underline"
                onClick={() => deleteMutation.mutate(fb.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}