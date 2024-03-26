import { Card, Flex, Text } from "@radix-ui/themes";
import { useSearchStore } from "../Store/searchStore";
import { useMemo } from "react";

export default function EmptyResults() {
  const searchQuery = useSearchStore((state) => state.searchQuery);

  const emptyText = useMemo(() => {
    if (searchQuery.length) {
      return "No results were found based off of that search."
    }

    return "Type in a search query to get started."
  }, [searchQuery])

  return (
    <Card my="20">
      <Flex justify="center" my="10">
        <Text>{emptyText}</Text>
      </Flex>
    </Card>
  )
}