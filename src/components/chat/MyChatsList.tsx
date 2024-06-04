import { Box, Button, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { useContext, useEffect } from "react";
import { ChatContext } from "../../store/context/chatContext";
import UserListItem from "./UserListItem";
import { ChatListItemType } from "../../utils/customTypes";
import IosSpinner from "../IosSpinner";
import { AddIcon } from "@chakra-ui/icons";
import CreateGroupChatModal from "./CreateGroupChatModal";

const MyChatsList = () => {
  const { isOpen: isOpenCreateGroupModal, onOpen: onOpenCreateGroupModal, onClose: onCloseCreateGroupModal } = useDisclosure();
  const {
    data: myChatsList,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["myChatsList"],
    queryFn: ({ signal }) => axiosInstance.get(`api/chat/all`, { signal: signal }),
  });
  const { userDetails, setSelectedChat, setChats, chats } = useContext(ChatContext);

  useEffect(() => {
    if (!isPending) {
      if (myChatsList) {
        setChats(myChatsList.data.result);
      }
    }
  }, [isPending]);

  const handleChatOnClick = (chat: ChatListItemType) => {
    setSelectedChat(chat);
  };

  return (
    <Box w={"100%"} h={"100%"} overflow={"hidden"}>
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"10px"} overflowX={"hidden"}>
        <Text fontSize={"x-large"} fontWeight={"600"}>
          My Chats
        </Text>
        <Button display={"flex"} justifyContent={"space-between"} alignItems={"center"} onClick={onOpenCreateGroupModal}>
          <Text mr={2}>New Group Chats</Text>
          <AddIcon />
        </Button>
        <CreateGroupChatModal isOpen={isOpenCreateGroupModal} onClose={onCloseCreateGroupModal} isCreating />
      </Box>
      {isPending && <IosSpinner />}
      {isError && <div>Error</div>}
      {!isPending && !isError && (
        <Stack p={"10px"} h={"90%"} overflowY={"auto"}>
          {chats.map((chat: ChatListItemType) => {
            const chatName: string = chat.isGroupChat ? chat.chatName ?? "" : chat.participants[0].name === userDetails.name ? chat.participants[1].name : chat.participants[0].name;
            const chatEmail: string = chat.participants[0].name === userDetails.name ? chat.participants[1].email : chat.participants[0].email;
            const chatUserId: string = chat.participants[0].name === userDetails.name ? chat.participants[1].id : chat.participants[0].id;
            const chatUserProfilePicture: string = chat.participants[0].name === userDetails.name ? chat.participants[1].profilePicture : chat.participants[0].profilePicture;
            return (
              <UserListItem key={chat.id} name={chatName} email={chatEmail} id={chatUserId} handleOnClick={() => handleChatOnClick(chat)} profilePicture={chatUserProfilePicture} chatId={chat.id} />
            );
          })}
        </Stack>
      )}
    </Box>
  );
};
export default MyChatsList;
