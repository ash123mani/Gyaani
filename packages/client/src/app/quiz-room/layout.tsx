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
      p={4}
      width="fit-content"
      height="100%"
      justifyContent="center"
    >
      {children}
    </Flex>
  );
}
