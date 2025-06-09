import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";

test("zeigt das MateWise-Logo im Footer an", () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
  expect(screen.getByAltText(/MateWise Logo/i)).toBeInTheDocument();
});
