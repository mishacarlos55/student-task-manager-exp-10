import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders student task manager heading", () => {
  render(<App />);
  const heading = screen.getByText(/student task manager/i);
  expect(heading).toBeInTheDocument();
});