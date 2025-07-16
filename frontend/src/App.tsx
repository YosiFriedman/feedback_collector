import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import { useState } from "react";

// Create a client instance once
const queryClient = new QueryClient();

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            {isAdmin ? "Admin Panel" : "Feedback Collector"}
          </h1>
          <button
            onClick={() => setIsAdmin((prev) => !prev)}
            className="px-4 py-2 rounded-full border border-blue-500 text-blue-600 bg-white hover:bg-blue-50 hover:text-blue-700 transition font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
          >
            {isAdmin ? "Switch to User View" : "Switch to Admin View"}
          </button>
        </header>

            <FeedbackForm />
            <FeedbackList isAdmin={isAdmin} />
      </div>
      </div>
    </QueryClientProvider>
  );
}