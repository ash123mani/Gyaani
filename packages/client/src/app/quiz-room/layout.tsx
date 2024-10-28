import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

export default function QuizRoomLayout({
  children, // will be a page or nested layout
}: {
  children: ReactNode;
}) {
  return (
    <Flex
      direction="column"
      mx="auto"
      as="section"
      gap={8}
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Flex>
  );
}
