import { GearIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { useSearchStore } from "../Store/searchStore";

export default function GearButton() {
  const setAdvancedSearchOpen = useSearchStore((state) => state.setAdvancedSearchOpen);

  return (
    <IconButton variant="soft" onClick={() => setAdvancedSearchOpen(true)}>
      <GearIcon />
    </IconButton>
  );
}
