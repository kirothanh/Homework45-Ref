/* eslint-disable react/prop-types */
import {
  AlertDialog,
  IconButton,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function DeleteButton({ onDelete }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleDelete = () => {
    localStorage.removeItem("data");
    onClose();
    onDelete();
  };

  return (
    <>
      <IconButton
        aria-label="Delete"
        icon={<DeleteIcon />}
        borderRadius="full"
        position="absolute"
        top={2}
        right={2}
        bg="teal.500"
        color="gray.200"
        zIndex={1}
        onClick={onOpen}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xoá tất cả lịch sử chơi?
            </AlertDialogHeader>

            <AlertDialogBody>
              Bạn chắc chắn chứ? Bạn sẽ không thể giữ lại lịch sử chơi trong quá
              khứ sau khi bấm xoá.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="teal" ref={cancelRef} onClick={onClose}>
                Giữ lại
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Xóa luôn
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
