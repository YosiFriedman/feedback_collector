import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from database import engine, init_db
from models import Feedback, FeedbackCreate
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
client = OpenAI()
init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def classify_sentiment(text: str) -> str:
    prompt = (
        "What is the sentiment of this comment? Reply with 'positive', 'neutral', or 'negative' only:\n\n"
        + text
    )
    print("[Sentiment] Classifying comment:")
    print(f"→ {text}\n")
    try:
        response = client.chat.completions.create(
            model="gpt-4.1",
            messages=[
                {"role": "system", "content": "You are a sentiment analysis classifier."},
                {"role": "user", "content": prompt},
            ],
            max_tokens=1,
            temperature=0,
        )
        sentiment = response["choices"][0]["message"]["content"].strip().lower()
        print(f"[Sentiment] Result: {sentiment}\n---")

        return sentiment if sentiment in ["positive", "neutral", "negative"] else "neutral"
    except Exception as e:
        print("Sentiment analysis failed:", e)
        return "neutral"

@app.post("/feedback", response_model=Feedback)
def create_feedback(feedback: FeedbackCreate):
    sentiment = classify_sentiment(feedback.comment)
    new_feedback = Feedback(**feedback.dict(), sentiment=sentiment)
    with Session(engine) as session:
        session.add(new_feedback)
        session.commit()
        session.refresh(new_feedback)
    return new_feedback

@app.get("/feedback", response_model=list[Feedback])
def get_feedbacks():
    with Session(engine) as session:
        return session.exec(select(Feedback)).all()

@app.delete("/feedback/{feedback_id}")
def delete_feedback(feedback_id: str):
    with Session(engine) as session:
        fb = session.get(Feedback, feedback_id)
        if not fb:
            raise HTTPException(status_code=404, detail="Feedback not found")
        session.delete(fb)
        session.commit()
    return {"message": "Deleted"}

@app.patch("/feedback/{feedback_id}")
def flag_feedback(feedback_id: str):
    with Session(engine) as session:
        fb = session.get(Feedback, feedback_id)
        if not fb:
            raise HTTPException(status_code=404, detail="Feedback not found")
        fb.flagged = True
        session.add(fb)
        session.commit()
        session.refresh(fb)
    return fb
