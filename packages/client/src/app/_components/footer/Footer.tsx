import { Box } from "@chakra-ui/react";

import styles from "./styles.module.css";

export function Footer() {
  return (
    <Box
      as="footer"
      className={styles.footer}
      border="thickDark"
      borderRadius="md"
    >
      <p>&copy; Gyaani Quiz</p>
    </Box>
  );
}
