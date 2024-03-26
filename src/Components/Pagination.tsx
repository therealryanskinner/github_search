import { Button, Flex, IconButton, Text } from "@radix-ui/themes";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import useGithubRepoSearch from "../Hooks/useGithubRepoSearch";
import { useSearchStore } from "../Store/searchStore";
import { useMemo } from "react";

export default function Pagination() {
  const maxPages = useSearchStore((state) => state.maxPages);
  const currentPage = useSearchStore((state) => state.currentPage);
  const { searchGithub } = useGithubRepoSearch();

  const numPages = useMemo(() => {
    if (maxPages <= 5 || currentPage < 5) {
      return new Array(5)
        .fill(null)
        .map((_, i) => i + 1)
        .filter((num) => num <= maxPages);
    }

    if (currentPage + 3 >= maxPages) {
      return new Array(5)
        .fill(null)
        .map((_, i) => maxPages - i)
        .filter((num) => num <= maxPages)
        .reverse();
    }

    return new Array(5).fill(null).map((_, i) => {
      const curr = i + 1;
      if (curr === 3) return currentPage;
      if (curr > 3) return currentPage + (curr - 3);
      return currentPage - (3 - curr);
    });
  }, [currentPage, maxPages])

  function goToPage(pageNum: number) {
    searchGithub({ page: pageNum });
  }

  if (maxPages <= 1) {
    return null;
  }

  return (
    <Flex justify="center" my="5">
      <IconButton
        disabled={currentPage - 3 <= 0}
        mr="2"
        onClick={() => goToPage(currentPage - 1)}
      >
        <ArrowLeftIcon />
      </IconButton>
      {currentPage - 3 > 1 && (
        <Flex>
          <Button variant="outline" onClick={() => goToPage(1)}>
            1
          </Button>
          <Text mx="1">...</Text>
        </Flex>
      )}
      {numPages.map((num) => (
        <Button
          key={num}
          variant={num === currentPage ? "soft" : "outline"}
          mr="1"
          onClick={() => goToPage(num)}
        >
          {num}
        </Button>
      ))}
      {currentPage + 3 < maxPages && (
        <Flex>
          <Text mr="1">...</Text>
          <Button variant="outline" onClick={() => goToPage(maxPages)}>
            {maxPages}
          </Button>
        </Flex>
      )}
      <IconButton
        disabled={currentPage + 3 >= maxPages}
        ml="2"
        onClick={() => goToPage(currentPage + 1)}
      >
        <ArrowRightIcon />
      </IconButton>
    </Flex>
  );
}
