import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../app')))

# Tests für die Category-Router (API)
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_categories():
    """Testet das Abrufen aller Kategorien über die API."""
    response = client.get("/skills/categories")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
