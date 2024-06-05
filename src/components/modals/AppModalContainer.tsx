import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { AppModalContainerType } from "../../utils/customTypes";

const AppModalContainer = ({ isOpen, onClose, children, closeOnOverlayClick = true }: AppModalContainerType) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={closeOnOverlayClick}>
      <ModalOverlay zIndex={9}>
        <ModalContent>{children}</ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
export default AppModalContainer;
