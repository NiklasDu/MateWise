import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MatchingCards from "../MatchingCards";
import { AuthProvider } from "../../context/AuthContext";
import { BrowserRouter } from "react-router-dom";

test("zeigt Hinweis, wenn keine Nutzer gefunden werden", async () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <MatchingCards propSkillToTeachId={null} showMatches={false} />
      </AuthProvider>
    </BrowserRouter>
  );
  expect(
    await screen.findByText(/keine passenden Nutzer gefunden/i)
  ).toBeInTheDocument();
});
