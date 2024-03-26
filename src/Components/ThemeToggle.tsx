import { Flex, Switch, Text } from "@radix-ui/themes";
import { useThemeStore } from "../Store/themeStore";

export default function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme); 
  const setTheme = useThemeStore((state) => state.setTheme);

  return (
    <Flex justify="end" mr="3" align="center" datatype="theme-container">
      <Switch
        datatype="theme-toggle"
        defaultChecked
        onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
      />
      <Text ml="2">{theme === "dark" ? "Dark Mode" : "Light Mode"}</Text>
    </Flex>
  )
}