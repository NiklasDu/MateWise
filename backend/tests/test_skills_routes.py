import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../app')))

# Tests für die Skills-Router (API)
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_skills_by_category():
    """Testet das Abrufen aller Skills einer Kategorie über die API."""
    # Kategorie muss existieren, z.B. "Test" oder eine andere vorhandene Kategorie
    response = client.get("/skills/", params={"category": "Test"})
    # 404 falls Kategorie nicht existiert, 200 falls vorhanden
    assert response.status_code in (200, 404)
    if response.status_code == 200:
        assert isinstance(response.json(), list)
