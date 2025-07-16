import { z } from "zod";

export const feedbackSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  rating: z.coerce.number().min(1, "Rating must be between 1 and 5").max(5),
  comment: z.string().min(5, "Comment should be at least 5 characters"),
});

export type FeedbackFormData = z.infer<typeof feedbackSchema>;