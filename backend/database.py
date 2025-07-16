from sqlmodel import create_engine, SQLModel

DATABASE_URL = "sqlite:///./database.db"
engine = create_engine(DATABASE_URL, echo=False)

def init_db():
    from models import Feedback
    SQLModel.metadata.create_all(engine)