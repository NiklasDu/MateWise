import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import DashboardNewSkills from "../DashboardNewSkills";

// Mock für fetch, damit keine echten API-Calls passieren
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

test("zeigt Überschrift und Skill-Input an", () => {
  render(<DashboardNewSkills />);
  expect(screen.getByText(/kein passender skill dabei/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Neuer Skillname/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Skill vorschlagen/i })
  ).toBeInTheDocument();
});

test("schaltet auf neue Kategorie um", () => {
  render(<DashboardNewSkills />);
  const button = screen.getByRole("button", {
    name: /neue kategorie anlegen/i,
  });
  fireEvent.click(button);
  expect(screen.getByPlaceholderText(/Neue Kategorie/i)).toBeInTheDocument();
});
