import { Button, DropdownMenu } from "@radix-ui/themes";
import { TSearchType, useSearchStore } from "../Store/searchStore";

export default function SearchDropdown() {
  const searchType = useSearchStore((state) => state.searchType);
  const setSearchType = useSearchStore((state) => state.setSearchType);
  const resetAdvancedSearch = useSearchStore((state) => state.resetAdvancedSearch);

  const handleClick = (searchType: TSearchType) => {
    setSearchType(searchType);
    // Reset options here because not all advanced search options apply to both search types
    resetAdvancedSearch();
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft" role="search-dropdown-button">
          Search By: {searchType === "org" ? "Organization" : "Username"}
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={() => handleClick("org")}>
          Organization
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => handleClick("user")}>
          Username
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
