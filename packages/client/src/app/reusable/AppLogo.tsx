import { Button } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export function AppLogo() {
  return (
    <Button as="span" py={2} px={4}>
      Gyaani <Search2Icon ml={2} />
      uiz
    </Button>
  );
}
