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
  roomId: string;
}

export function WaitingToJoinRoomModal({
  isOpen,
  onClose,
  roomId,
}: WaitingToJoinRoomModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Waiting for Players to join Room </ModalHeader>
        <ModalCloseButton />
        <ModalBody>Waiting for other players to join room {roomId}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
