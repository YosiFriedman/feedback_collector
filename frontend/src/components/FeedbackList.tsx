import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchFeedbacks, deleteFeedback, flagFeedback } from "@/lib/api";
import FeedbackCard from "@/components/FeedbackCard";
import { useState } from "react";

export default function FeedbackList({ isAdmin = false }: { isAdmin?: boolean }) {
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

  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "highest" | "lowest">("newest");
  const [filterRating, setFilterRating] = useState<number | "all">("all");

  // Sort and filter feedbacks
  const processedData = (data ?? [])
    .filter(fb => filterRating === "all" || fb.rating === filterRating)
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sortBy === "oldest") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      if (sortBy === "highest") return b.rating - a.rating;
      if (sortBy === "lowest") return a.rating - b.rating;
      return 0;
    });

  if (isPending) return <p className="text-center">Loading feedback...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load feedback.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-wrap gap-4 mb-4 items-center justify-between">
        <div>
          <label className="mr-2 font-medium">Sort by:</label>
          <select
            className="border rounded px-2 py-1"
            value={sortBy}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value as "newest" | "oldest" | "highest" | "lowest")}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
        <div>
          <label className="mr-2 font-medium">Filter by rating:</label>
          <select
            className="border rounded px-2 py-1"
            value={filterRating}
            onChange={e => setFilterRating(e.target.value === "all" ? "all" : Number(e.target.value))}
          >
            <option value="all">All</option>
            {[5,4,3,2,1].map(r => (
              <option key={r} value={r}>{r} stars</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {processedData.length === 0 && <p className="text-center col-span-full">No feedback yet.</p>}
        {processedData.map((fb) => (
          <FeedbackCard
            key={fb.id}
            id={fb.id}
            name={fb.name}
            comment={fb.comment}
            rating={fb.rating}
            created_at={fb.created_at}
            flagged={fb.flagged}
            isAdmin={isAdmin}
            onDelete={deleteMutation.mutate}
            onFlag={flagMutation.mutate}
            sentiment={fb.sentiment}
          />
        ))}
      </div>
    </div>
  );
}