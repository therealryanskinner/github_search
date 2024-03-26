import { Box, Flex } from "@radix-ui/themes";
import GithubForm from "./Components/SearchHeader";
import "./App.css";
import "@radix-ui/themes/styles.css";
import RepoTable from "./Components/RepoTable";
import { Theme } from "@radix-ui/themes";
import AdvancedSearchDialog from "./Components/AdvancedSearchDialog";
import { useThemeStore } from "./Store/themeStore";
import octoImg from "./assets/octoImg.png";
import ThemeToggle from "./Components/ThemeToggle";

function App() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <Theme appearance={theme}>
      <ThemeToggle />
      <Box mb="6">
        <Flex justify="center">
          <Box mt="9" mb="9">
            <img
              src={octoImg}
              alt="octoImg"
              className="octoImg"
              width="200px"
            />
          </Box>
        </Flex>
        <AdvancedSearchDialog />
        <GithubForm />
        <Flex justify="center">
          <Box width="80%">
            <RepoTable />
          </Box>
        </Flex>
      </Box>
    </Theme>
  );
}

export default App;
