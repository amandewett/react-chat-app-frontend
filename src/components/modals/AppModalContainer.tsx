import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { AppModalContainerProps } from "../../utils/customTypes";

const AppModalContainer = ({ isOpen, onClose, children, closeOnOverlayClick = true }: AppModalContainerProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={closeOnOverlayClick}>
      <ModalOverlay zIndex={9}>
        <ModalContent>{children}</ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
export default AppModalContainer;
