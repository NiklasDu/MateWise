import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FeatureAdvantages from "../FeatureAdvantages";

test("zeigt Vorteile auf der Startseite an", () => {
  render(<FeatureAdvantages />);
  expect(screen.getByText(/deine vorteile/i)).toBeInTheDocument();
  expect(screen.getByText(/keine kosten/i)).toBeInTheDocument();
});