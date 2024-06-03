import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Avatar, Text, MenuDivider } from "@chakra-ui/react";
import { useContext } from "react";
import { ChatContext } from "../../store/context/chatContext";
import { ProfileModalType } from "../../utils/customTypes";

const ProfileModal = ({ isOpen, onClose, isForOtherUser = false, userName, userEmail, profilePicture }: ProfileModalType) => {
  const { userDetails } = useContext(ChatContext);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      {userDetails && (
        <ModalContent>
          <ModalHeader fontSize={"40px"} display={"flex"} justifyContent={"center"}>
            {!isForOtherUser && userDetails && userDetails.name}
            {isForOtherUser && userName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
            <Avatar
              name={isForOtherUser ? userName : userDetails && userDetails.name}
              src={
                isForOtherUser
                  ? profilePicture!.includes("http")
                    ? profilePicture
                    : `${import.meta.env.VITE_SERVER_HOST}/${profilePicture}`
                  : userDetails && userDetails.profilePicture.includes("http")
                  ? userDetails.profilePicture
                  : `${import.meta.env.VITE_SERVER_HOST}/${userDetails.profilePicture}`
              }
              size={"2xl"}
            />
            <MenuDivider />
            <Text fontSize="xl" as={"b"}>
              Email: {isForOtherUser ? userEmail : userDetails && userDetails.email}
            </Text>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
};
export default ProfileModal;
