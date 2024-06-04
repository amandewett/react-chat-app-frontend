import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { MyModalContainerType } from "../utils/customTypes";

const MyModalContainer = ({ isOpen, onClose, children, modalHeader, onCloseClicked }: MyModalContainerType) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnEsc={true} closeOnOverlayClick={false}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton onClick={onCloseClicked} />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
export default MyModalContainer;
