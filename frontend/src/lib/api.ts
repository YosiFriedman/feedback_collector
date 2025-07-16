import axios from "axios";
import type { Feedback } from "@/types/feedback";
import type { FeedbackFormData } from "@/schemas/feedbackSchema";

const API_BASE = "http://localhost:8000"; // FastAPI server URL

export const fetchFeedbacks = async (): Promise<Feedback[]> => {
  const res = await axios.get(`${API_BASE}/feedback`);
  return res.data;
};

export const submitFeedback = async (data: FeedbackFormData) => {
  const res = await axios.post(`${API_BASE}/feedback`, data);
  return res.data;
};

export const deleteFeedback = async (id: string) => {
  const res = await axios.delete(`${API_BASE}/feedback/${id}`);
  return res.data;
};

export const flagFeedback = async (id: string) => {
  const res = await axios.patch(`${API_BASE}/feedback/${id}`);
  return res.data;
};