from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
from pydantic import EmailStr, constr, conint
import uuid

class Feedback(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    name: str
    email: str
    rating: int
    comment: str
    flagged: bool = False
    sentiment: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class FeedbackCreate(SQLModel):
    name: constr(min_length=1, max_length=50) 
    email: EmailStr                            
    rating: conint(ge=1, le=5)                
    comment: constr(min_length=5, max_length=1000)