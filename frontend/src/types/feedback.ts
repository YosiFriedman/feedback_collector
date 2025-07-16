export type Feedback = {
    id: string;
    name: string;
    email: string;
    rating: number;
    comment: string;
    flagged: boolean;
    sentiment?: "positive" | "neutral" | "negative";
    created_at: string;
  };