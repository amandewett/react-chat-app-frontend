import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { AppModalContainerProps } from "../../utils/customTypes";

const AppModalContainer = ({ isOpen, onClose, children, closeOnOverlayClick = true }: AppModalContainerProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={closeOnOverlayClick}>
      <ModalOverlay zIndex={0}>
        <ModalContent m={[4, 3, 0]} bgColor="#262626">
          {children}
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
export default AppModalContainer;
