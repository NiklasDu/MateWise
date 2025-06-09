import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../LoginForm";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";

// Hilfsfunktion für das Rendern mit allen Providern
function renderWithProviders(ui) {
  return render(
    <BrowserRouter>
      <AuthProvider>{ui}</AuthProvider>
    </BrowserRouter>
  );
}

test("zeigt Eingabefelder und Anmelden-Button an", () => {
  renderWithProviders(<LoginForm />);
  expect(screen.getByPlaceholderText(/Email Adresse/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Passwort/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Anmelden/i })).toBeInTheDocument();
});

test("zeigt Link für Passwort vergessen und Registrierung an", () => {
  renderWithProviders(<LoginForm />);
  expect(screen.getByText(/Passwort vergessen/i)).toBeInTheDocument();
  expect(screen.getByText(/Registrieren/i)).toBeInTheDocument();
});
