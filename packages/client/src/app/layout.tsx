import { type ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import { type Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";

import { Footer } from "@/app/reusable/footer/Footer";
import styles from "@/app/styles.module.css";
import { Header } from "@/app/reusable/header/Header";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Gyaani Quiz",
  description: "Real time quiz game on various topics.",
};

interface RootLayoutProps {
  children: ReactNode;
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto_mono.variable}`}>
      <body>
        <Providers>
          <Box className={styles.page}>
            <Header />
            <Box
              className={styles.layoutContainer}
              border="thinLight"
              borderRadius="md"
              overflow="auto"
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
