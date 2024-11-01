"use client";

import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { type ReactNode } from "react";

const borders = {
  thickDark: `2px solid var(--chakra-colors-gray-200)`,
  thickLight: `2px solid var(--chakra-colors-gray-100)`,
  thinDark: `1px solid var(--chakra-colors-gray-200)`,
  thinLight: `1px solid var(--chakra-colors-gray-100)`,
};

const overrides = {
  borders,
  fonts: {
    body: "var(--font-roboto-mono)",
    heading: "var(--font-roboto-mono)",
  },
  components: {
    Modal: {
      baseStyle: {
        overlay: {
          backgroundColor: "var(--chakra-colors-blackAlpha-800)",
        },
      },
    },
  },
};

const theme = extendTheme(
  overrides,
  withDefaultColorScheme({ colorScheme: "pink" }),
);

export function Providers({ children }: { children: ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
