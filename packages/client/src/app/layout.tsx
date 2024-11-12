import { type ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import { type Metadata } from "next";
import { Poppins } from "next/font/google";

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

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body>
        <Providers>
          <Box className={styles.page}>
            <Header />
            <Box
              className={styles.layoutContainer}
              border="thickLight"
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
