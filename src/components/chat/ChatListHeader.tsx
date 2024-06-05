import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { Suspense, lazy } from "react";

const CreateGroupChatModal = lazy(() => import("./CreateGroupChatModal"));

const ChatListHeader = () => {
  const { isOpen: isOpenCreateGroupModal, onOpen: onOpenCreateGroupModal, onClose: onCloseCreateGroupModal } = useDisclosure();

  return (
    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
      <Text fontSize={"2xl"} fontWeight={"600"}>
        My Chats
      </Text>
      <Button display={"flex"} justifyContent={"space-between"} alignItems={"center"} _hover={{ bgColor: "hoverColor" }} onClick={onOpenCreateGroupModal}>
        <Text mr={2}>New Group Chats</Text>
        <AddIcon />
      </Button>
      <Suspense>
        <CreateGroupChatModal isOpen={isOpenCreateGroupModal} onClose={onCloseCreateGroupModal} isCreating={true} />
      </Suspense>
    </Box>
  );
};
export default ChatListHeader;
