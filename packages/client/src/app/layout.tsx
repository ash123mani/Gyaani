import type { Metadata } from "next";
import { type ReactNode } from "react";

import { Providers } from "./providers";
import { geistMono, geistSans } from "@/app/fonts";
import { Header } from "@/app/components/header/Header";
import { Footer } from "@/app/components/footer/Footer";
import styles from "@/app/styles.module.css";
import { Box } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Gyaani Quiz",
  description: "Real time quiz game on various topics.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <Box className={styles.page}>
            <Header />
            <Box
              className={styles.layoutContainer}
              border="thickDark"
              borderRadius="md"
            >
              {children}
            </Box>
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
