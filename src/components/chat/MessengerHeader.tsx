import { ArrowBackIcon, ViewIcon } from "@chakra-ui/icons";
import { Box, Text, Button, useDisclosure } from "@chakra-ui/react";
import { Suspense, useContext } from "react";
import { AppContext } from "../../store/context/appContext";
import CreateGroupChatModal from "./CreateGroupChatModal";
import {} from "../../utils/customTypes";
import AppModalContainer from "../modals/AppModalContainer";
import UserProfileModal from "../modals/UserProfileModal";

const MessengerHeader = () => {
  const { isOpen: isOpenUpdateGroupModal, onOpen: onOpenUpdateGroupModal, onClose: onCloseUpdateGroupModal } = useDisclosure();
  const { isOpen: isOpenProfileModal, onOpen: onOpenProfileModal, onClose: onCloseProfileModal } = useDisclosure();
  const { selectedChat, userDetails, setSelectedChat } = useContext(AppContext);
  const title = selectedChat
    ? selectedChat?.isGroupChat
      ? selectedChat?.chatName
      : userDetails?.name === selectedChat?.participants[0]?.name
      ? selectedChat?.participants[1]?.name
      : selectedChat?.participants[0]?.name
    : "";
  const email = selectedChat
    ? selectedChat?.isGroupChat
      ? ""
      : userDetails?.name === selectedChat?.participants[0]?.name
      ? selectedChat?.participants[1]?.email
      : selectedChat?.participants[0]?.email
    : "";

  const profilePicture = selectedChat
    ? selectedChat?.isGroupChat
      ? ""
      : userDetails?.name === selectedChat?.participants[0]?.name
      ? selectedChat?.participants[1]?.profilePicture
      : selectedChat?.participants[0]?.profilePicture
    : "";

  const handleBackButton = () => {
    setSelectedChat(undefined);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      p={4}
      bgColor={"appBgColor"}
      textColor={"appTextColor"}
      h={"100%"}
      w={"100%"}
      roundedTopLeft={"15px"}
      roundedTopRight={"15px"}
      borderBottomWidth={2}
      borderBottomColor="appPrimaryColor"
    >
      <Box display={"flex"} alignItems={"center"}>
        <Button bgColor={"appPrimaryColor"} mr={2} display={["inline", "inline", "inline", "inline", "none"]} onClick={handleBackButton}>
          <ArrowBackIcon />
        </Button>
        <Text fontSize={["large", "larger", "x-large"]} fontWeight={"500"}>
          {title}
        </Text>
      </Box>
      {selectedChat && (
        <Button
          display={"flex"}
          bgColor={"appPrimaryColor"}
          justifyContent={"space-between"}
          alignItems={"center"}
          _hover={{ bgColor: "appHoverColor" }}
          onClick={() => {
            if (selectedChat.isGroupChat) {
              onOpenUpdateGroupModal();
            } else {
              onOpenProfileModal();
            }
          }}
        >
          <ViewIcon color={"appBgColor"} />
        </Button>
      )}
      {selectedChat && selectedChat.isGroupChat && (
        <CreateGroupChatModal
          isOpen={isOpenUpdateGroupModal}
          onClose={onCloseUpdateGroupModal}
          chatId={selectedChat.id}
          groupName={title}
          groupParticipants={selectedChat?.participants}
          isCreating={false}
          groupAdminId={selectedChat?.groupAdminID ?? ""}
        />
      )}

      {selectedChat && !selectedChat.isGroupChat && (
        <Suspense>
          <AppModalContainer isOpen={isOpenProfileModal} onClose={onCloseProfileModal}>
            <UserProfileModal userName={title} userEmail={email} userProfilePicture={profilePicture} />
          </AppModalContainer>
        </Suspense>
      )}
    </Box>
  );
};
export default MessengerHeader;
