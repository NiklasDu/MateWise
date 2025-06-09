import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../app')))

# Tests für die Suggestions-Router (API)
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_suggestion():
    """Testet das Erstellen eines neuen Vorschlags über die API."""
    response = client.post("/suggestions/request", json={
        "category": "API-Test",
        "skill": "FastAPI-TestSkill"
    })
    assert response.status_code == 200 or response.status_code == 201
    data = response.json()
    assert "message" in data
    assert "erfolgreich" in data["message"].lower()
