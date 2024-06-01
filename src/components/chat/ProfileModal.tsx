import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Avatar, Text, MenuDivider } from "@chakra-ui/react";
import { useContext } from "react";
import { ChatContext } from "../../store/context/chatContext";

const ProfileModal = ({ isOpen, onClose }: any) => {
  const { userDetails } = useContext(ChatContext);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      {userDetails && (
        <ModalContent>
          <ModalHeader fontSize={"40px"} display={"flex"} justifyContent={"center"}>
            {userDetails && userDetails.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
            <Avatar
              name={userDetails && userDetails.name}
              src={userDetails && userDetails.profilePicture.includes("http") ? userDetails.profilePicture : `${import.meta.env.VITE_SERVER_HOST}/${userDetails.profilePicture}`}
              size={"2xl"}
            />
            <MenuDivider />
            <Text fontSize="xl" as={"b"}>
              Email: {userDetails && userDetails.email}
            </Text>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
};
export default ProfileModal;
