import { TextField } from "@radix-ui/themes";
import { useSearchStore } from "../Store/searchStore";
import { useDebouncedValue } from "../Hooks/useDebouncedValue";
import { useEffect } from "react";
import { useGithubRepoSearch } from "../Hooks/useGithubRepoSearch";

export default function SearchInput() {
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);

  const debouncedQuery = useDebouncedValue(searchQuery, 500)
  const { searchGithub } = useGithubRepoSearch()

  useEffect(() => {
    if (debouncedQuery.length) {
      searchGithub()
    }
  }, [debouncedQuery]) // eslint-disable-line

  return (
    <TextField.Root
      placeholder="Search repositories..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}
