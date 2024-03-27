import { Button, Flex, IconButton, Text } from "@radix-ui/themes";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useGithubRepoSearch } from "../Hooks/useGithubRepoSearch";
import { useSearchStore } from "../Store/searchStore";
import { useMemo } from "react";

export default function Pagination() {
  const maxPages = useSearchStore((state) => state.maxPages);
  const currentPage = useSearchStore((state) => state.currentPage);
  const { searchGithub } = useGithubRepoSearch();

  const numPages = useMemo(() => {
    const baseArray = Array.from({ length: 5 }, (_, i) => i + 1);

    if (maxPages <= 5 || currentPage < 5) {
      return baseArray.filter((num) => num <= maxPages);
    }
  
    if (currentPage + 3 >= maxPages) {
      return baseArray.map((num) => maxPages - num + 1).reverse();
    }

    return baseArray.map((num) => currentPage - 3 + num);
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
