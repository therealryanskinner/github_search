import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput from "../src/Components/SearchInput";
import { useSearchStore } from "../src/Store/searchStore";
import { useDebouncedValue } from "../src/Hooks/useDebouncedValue";
import { useGithubRepoSearch } from "../src/Hooks/useGithubRepoSearch";
import { describe, it, expect, beforeEach, vi } from "vitest";

// Directly mocking the modules with the desired implementations
vi.mock("../src/Store/searchStore", () => ({
  useSearchStore: vi.fn((selector) => {
    return selector({
      searchQuery: "",
      setSearchQuery: vi.fn(),
    });
  }),
}));

// Correcting the mocking approach for useDebouncedValue
vi.mock("../src/Hooks/useDebouncedValue", () => ({
  // Mocking the implementation to immediately return the passed value
  useDebouncedValue: vi.fn((value) => value)
}));

vi.mock("../src/Hooks/useGithubRepoSearch", () => ({
  useGithubRepoSearch: vi.fn(() => ({
    searchGithub: vi.fn(),
  })),
}));

describe("SearchInput Component", () => {
  const setSearchQueryMock = vi.fn();
  const searchGithubMock = vi.fn();

  beforeEach(() => {
    // Providing new implementations for each test run
    vi.mocked(useSearchStore).mockImplementation((selector) => {
      return selector({
        searchQuery: "",
        setSearchQuery: setSearchQueryMock,
      });
    });

    vi.mocked(useDebouncedValue).mockImplementation((value) => value);
    vi.mocked(useGithubRepoSearch).mockImplementation(() => ({
      searchGithub: searchGithubMock,
    }));
  });

  it("renders correctly", () => {
    render(<SearchInput />);
    expect(
      screen.getByPlaceholderText("Search repositories...")
    ).toBeInTheDocument();
  });

  it("calls setSearchQuery", async () => {
    render(<SearchInput />);
    const inputElement = screen.getByPlaceholderText("Search repositories...");

    fireEvent.change(inputElement, {
      target: { value: "this is a test value" },
    });
    expect(setSearchQueryMock).toHaveBeenCalledWith("this is a test value");
  });
});
