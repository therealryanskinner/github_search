import { render, screen } from "@testing-library/react";
import { useSearchStore } from "../src/Store/searchStore";
import { describe, it, expect, beforeEach, vi } from "vitest";
import RepoTable from "../src/Components/RepoTable";

// Directly mocking the modules with the desired implementations
vi.mock("../src/Store/searchStore", () => ({
  useSearchStore: vi.fn((selector) => {
    return selector({
      repos: [],
      loading: false,
    });
  }),
}));

describe("RepoTable Component", () => {
  beforeEach(() => {
    // Providing new implementations for each test run
    vi.mocked(useSearchStore).mockImplementation((selector) => {
      return selector({
        repos: [
          {
            id: 1,
            name: "repo name test",
            created_at: "2023-04-24T17:26:02Z",
            updated_at: "2023-05-24T17:26:02Z",
          },
        ],
        loading: false,
      });
    });
  });

  it("renders correctly", () => {
    render(<RepoTable />);
    expect(screen.getByText("repo name test")).toBeInTheDocument();
  });
});
