from app.database import engine
from app.models import Base  # importiert alle Modelle, damit DB weiß, was erstellt wird

Base.metadata.create_all(bind=engine) 