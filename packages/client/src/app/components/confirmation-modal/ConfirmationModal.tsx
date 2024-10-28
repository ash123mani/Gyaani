import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useRef } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  description?: string;
  title?: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  description = "Are you sure?",
  title = "You cant undo this action afterwards.",
  confirmBtnText = "Confirm",
  cancelBtnText = "Cancel",
}: ConfirmationModalProps) => {
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef.current!}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{description}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef.current!} onClick={onClose}>
              {cancelBtnText}
            </Button>
            <Button colorScheme="red" onClick={onConfirm} ml={3}>
              {confirmBtnText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
