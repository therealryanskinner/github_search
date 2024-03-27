import { render, fireEvent, screen } from "@testing-library/react";
import Pagination from "../src/Components/Pagination";
import { useSearchStore } from "../src/Store/searchStore";
import { useGithubRepoSearch } from "../src/Hooks/useGithubRepoSearch";
import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("../src/Store/searchStore", () => ({
  useSearchStore: vi.fn((selector) => {
    return selector({
      currentPage: 5,
      maxPages: 10,
    });
  }),
}));

vi.mock("../src/Hooks/useGithubRepoSearch", () => ({
  useGithubRepoSearch: vi.fn(() => ({
    searchGithub: vi.fn(),
  })),
}));

describe("Pagination", () => {
  const searchGithubMock = vi.fn();

  beforeEach(() => {
    // Providing new implementations for each test run
    vi.mocked(useSearchStore).mockImplementation((selector) => {
      return selector({
        currentPage: 1,
        maxPages: 10,
      });
    });

    vi.mocked(useGithubRepoSearch).mockImplementation(() => ({
      searchGithub: searchGithubMock,
    }));
  });

  it("calls searchGithub with correct page number when pagination buttons are clicked", () => {
    render(<Pagination />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(8);

    fireEvent.click(buttons[2]);
    expect(searchGithubMock).toHaveBeenLastCalledWith({ page: 2 });

    fireEvent.click(buttons[3]);
    expect(searchGithubMock).toHaveBeenLastCalledWith({ page: 3 });
  });
});
