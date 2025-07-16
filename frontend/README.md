# Feedback Collector App

A modern feedback collection app built with **React**, **TypeScript**, and **React Query**. This project demonstrates clean component architecture, type safety, and responsive UI design.

---

## Features

- **Submit Feedback:** Users can submit feedback with a rating and comment.
- **Feedback Grid:** Displays feedback in a responsive, sortable, and filterable grid.
- **Admin Panel:** Toggle to admin mode for additional controls (flag/delete feedback).
- **Sorting & Filtering:** Sort feedback by recency or rating; filter by rating.
- **TypeScript:** Full type safety across components and API.
- **Modern Data Fetching:** Uses [React Query](https://tanstack.com/query/latest) for efficient data management.
- **Pixel-Perfect UI:** Styled with Tailwind CSS for a clean, responsive look.

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/feedback_collector.git
   cd feedback_collector/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Backend:**  
   The frontend expects a backend running at `http://localhost:8000`.  
   See `/backend` for a simple FastAPI backend.

---

## Project Structure

```
frontend/
  src/
    components/
      FeedbackList.tsx      # Displays feedback grid with sorting/filtering
      FeedbackCard.tsx      # Individual feedback display
      FeedbackForm.tsx      # Form for submitting feedback
      AdminPanel.tsx        # Admin controls (flag/delete)
    lib/
      api.ts                # API calls (fetch, submit, delete, flag)
      utils.ts              # Utility functions
    types/
      feedback.ts           # TypeScript types
    schemas/
      feedbackSchema.ts     # Validation schemas
    App.tsx                 # Main app component
    main.tsx                # Entry point
```