import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

/**
 * Einstiegspunkt der Gesamten React App
 *
 * - StrictMode: aktiviert mehr Codeprüfungen für mehr Qualität
 * - BrowserRouter: ermöglicht das Routing zwischen Seiten
 * - AuthProvider: Stellt Authentifizierungs-Kontext bereit
 * - App: Die Hauptkomponente, die alle anderen Komponenten enthält
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
