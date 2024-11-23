import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

export default function QuizRoomLayout({
  children, // will be a page or nested layout
}: {
  children: ReactNode;
}) {
  return (
    <Flex
      direction="row"
      mx="auto"
      as="section"
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      color="gray.50"
    >
      {children}
    </Flex>
  );
}
