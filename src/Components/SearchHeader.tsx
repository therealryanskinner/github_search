import { Box, Flex } from "@radix-ui/themes";
import SearchDropdown from "./SearchDropdown";
import SearchInput from "./SearchInput";
import GearButton from "./GearButton";
import SearchTags from "./SearchTags";

export default function SearchHeader() {
  return (
    <>
      <Flex mb="5" direction="column">
        <Flex mb="5" justify="center">
          <Box mr="3">
            <SearchDropdown />
          </Box>
          <Box mr="3">
            <SearchInput />
          </Box>
          <Box>
            <GearButton />
          </Box>
        </Flex>
        <Box>
          <SearchTags />
        </Box>
      </Flex>
    </>
  );
}
