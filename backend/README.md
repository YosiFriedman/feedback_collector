# Feedback Collector Backend

A backend for the Feedback Collector app, built with **FastAPI**, **SQLModel**, and **OpenAI**.

---

## Features

- **REST API** for feedback submission, retrieval, deletion, and flagging
- **SQLite** database for persistent storage
- **Sentiment analysis** using OpenAI API on feedback comments

---

## Getting Started

### Prerequisites
- Python 3.10+
- (Recommended) Virtual environment (venv, virtualenv, etc.)
- OpenAI API key (set as `OPENAI_API_KEY` in your environment)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/feedback_collector.git
   cd feedback_collector/backend
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set your OpenAI API key:**
   - Create a `.env` file in the backend directory:
     ```env
     OPENAI_API_KEY=your-key-here
     ```

5. **Run the server:**
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000`.

---

## API Endpoints

- `POST   /feedback`   — Submit new feedback (with sentiment analysis)
- `GET    /feedback`   — Retrieve all feedback
- `DELETE /feedback/{id}` — Delete feedback by ID
- `PATCH  /feedback/{id}` — Flag feedback as inappropriate

### Example Feedback Object
```json
{
  "id": "...",
  "name": "Alice",
  "email": "alice@example.com",
  "rating": 5,
  "comment": "Great app!",
  "flagged": false,
  "sentiment": "positive",
  "created_at": "2024-06-01T12:00:00Z"
}
```

---

## Database
- Uses SQLite (`database.db` in the backend folder)
- Models defined in `models.py` using SQLModel

---

## Notes
- Sentiment analysis uses OpenAI GPT-4.1 via the OpenAI API
---