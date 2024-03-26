import { Badge, Box, Card, Flex, Grid, Text } from "@radix-ui/themes";
import { useSearchStore } from "../Store/searchStore";

export default function SearchTags() {
  const advancedSearch = useSearchStore((state) => state.advancedSearchOptions);

  return (
    <Flex justify="center">
      <Box width="400px">
        <Card variant="classic">
          <Flex align="center" justify="center">
            <Text mr="3">Filters:</Text>
            <Grid columns="2" gap="1" rows="repeat(2, 24px)" width="auto">
              {Object.entries(advancedSearch).map(([key, option]) => (
                <Box key={key} role={`filter-tag`}>
                  <Badge color="blue" role={`filter-tag-${option.name}`}>
                    {`${option.name}: ${option.value}`}
                  </Badge>
                </Box>
              ))}
            </Grid>
          </Flex>
        </Card>
      </Box>
    </Flex>
  );
}
