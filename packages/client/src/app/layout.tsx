import { type ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import { type Metadata } from "next";

import { geistMono, geistSans } from "@/app/fonts";
import { Footer } from "@/app/components/footer/Footer";
import styles from "@/app/styles.module.css";
import { Header } from "@/app/components/header/Header";

import { Providers } from "./providers";

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
              as="main"
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
