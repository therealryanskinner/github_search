import { render, screen } from "@testing-library/react";

import App from "../src/App";

describe("App", () => {
  it("renders initial state", async () => {
    render(<App />);

    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
    expect(
      screen.getByText("Type in a search query to get started.")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search repositories...")
    ).toBeInTheDocument();

    await screen.findByText("Results per page: 10");
    await screen.findByText("Sort order: full_name");
    await screen.findByText("Direction: asc");
    await screen.findByText("Repository type: all");
  });
});
