import { render, screen, fireEvent } from "@testing-library/react";
import { useSearchStore } from "../src/Store/searchStore";
import { describe, it, expect, beforeEach, vi } from "vitest";
import GearButton from "../src/Components/GearButton";

vi.mock("../src/Store/searchStore", () => ({
  useSearchStore: vi.fn((selector) => {
    return selector({
      setAdvancedSearchOpen: vi.fn(),
    });
  }),
}));

describe("GearButton", () => {
  const setAdvancedSearchOpenMock = vi.fn();

  beforeEach(() => {
    // Providing new implementations for each test run
    vi.mocked(useSearchStore).mockImplementation((selector) => {
      return selector({
        setAdvancedSearchOpen: setAdvancedSearchOpenMock,
      });
    });
  });

  it("calls setAdvancedSearchOpen with true when clicked", () => {
    render(<GearButton />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(setAdvancedSearchOpenMock).toHaveBeenCalledWith(true);
  });
});
