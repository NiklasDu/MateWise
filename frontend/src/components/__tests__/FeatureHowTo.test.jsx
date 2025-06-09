import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FeatureHowTo from "../FeatureHowTo";

test("zeigt Anleitungstext auf der Startseite an", () => {
  render(<FeatureHowTo />);
  expect(
    screen.getByText(/In wenigen Schritten zum perfekten Lernpartner/i)
  ).toBeInTheDocument();
});
