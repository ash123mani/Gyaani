// app/providers.tsx
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
};

const theme = extendTheme(
  overrides,
  withDefaultColorScheme({ colorScheme: "orange" }),
);

export function Providers({ children }: { children: ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
