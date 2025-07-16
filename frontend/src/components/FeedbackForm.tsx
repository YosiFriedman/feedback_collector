import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { feedbackSchema, type FeedbackFormData } from "../schemas/feedbackSchema";
import { submitFeedback } from "@/lib/api";

export default function FeedbackForm() {
  const queryClient = useQueryClient();

const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
} = useForm({
  resolver: zodResolver(feedbackSchema),
});

  const mutation = useMutation({
    mutationFn: submitFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      reset();
    },
  });

  const onSubmit = (data: FeedbackFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 max-w-md w-full mx-auto bg-white/80 rounded-xl shadow-lg backdrop-blur-md">
      <div>
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <select {...register("rating")} className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
          <option value="">Rating</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
      </div>

      <div>
        <textarea
          rows={4}
          placeholder="Comments"
          {...register("comment")}
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || mutation.status === "pending"}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full font-semibold shadow-md disabled:opacity-60"
      >
        {mutation.status === "pending" ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  );
}