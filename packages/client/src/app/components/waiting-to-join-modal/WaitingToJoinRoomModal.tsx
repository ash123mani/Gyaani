import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseModalProps,
} from "@chakra-ui/react";

interface WaitingToJoinRoomModalProps {
  onClose: UseModalProps["onClose"];
  isOpen: UseModalProps["isOpen"];
}

export function WaitingToJoinRoomModal({
  isOpen,
  onClose,
}: WaitingToJoinRoomModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Waiting for Players to join</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Waiting to join..</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
