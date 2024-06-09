import { Box, VStack } from "@chakra-ui/react";
import axiosInstance from "../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useContext } from "react";
import { AppContext } from "../../store/context/appContext";
import IosSpinner from "../IosSpinner";
import { ChatProps, UserChatListProps } from "../../utils/customTypes";
import UserListItem from "./UserListItem";

const UserChatList = ({ socket }: UserChatListProps) => {
  const { userDetails, setSelectedChat, setChats, chats, selectedChat } = useContext(AppContext);

  const {
    data: dataUserChatList,
    isPending: isPendingUserChatList,
    isError: isErrorUserChatList,
  } = useQuery({
    queryKey: ["userChatsList"],
    queryFn: ({ signal }) => axiosInstance.get(`api/chat/all`, { signal: signal }),
  });

  useEffect(() => {
    if (!isPendingUserChatList) {
      if (dataUserChatList) {
        setChats(dataUserChatList.data.result);
      }
    }
  }, [isPendingUserChatList]);

  const handleOnChatClicked = (chat: ChatProps) => {
    if (chat !== selectedChat) setSelectedChat(chat);
  };

  return (
    <Box mt={5} overflow={"auto"} maxH={"90%"} p={4} pb={10}>
      {!isPendingUserChatList && !isErrorUserChatList && (
        <VStack spacing={3}>
          {chats &&
            chats?.map((chat: ChatProps) => {
              const chatName = chat?.isGroupChat ? chat?.chatName : chat?.participants[0]?.id === userDetails?.id ? chat?.participants[1]?.name : chat?.participants[0]?.name;
              const chatEmail = chat?.participants[0]?.id === userDetails?.id ? chat?.participants[1]?.email : chat?.participants[0]?.email;
              const chatUserId = chat?.participants[0]?.id === userDetails?.id ? chat?.participants[1]?.id : chat?.participants[0]?.id;
              const chatUserProfilePicture = chat?.isGroupChat
                ? chat?.participants[0]?.profilePicture
                : chat?.participants[0]?.id === userDetails?.id
                ? chat?.participants[1]?.profilePicture
                : chat?.participants[0]?.profilePicture;
              return (
                <UserListItem
                  key={chat?.id}
                  name={chatName!}
                  email={chatEmail ?? ""}
                  id={chatUserId ?? ""}
                  handleOnClick={() => handleOnChatClicked(chat)}
                  profilePicture={chatUserProfilePicture}
                  chatId={chat.id}
                  isForChatList={true}
                  latestMessage={chat?.latestMessageId !== null ? chat?.latestMessage?.message : ""}
                  latestMessageSenderName={chat?.latestMessageId !== null ? chat?.latestMessage?.sender?.name : ""}
                />
              );
            })}
        </VStack>
      )}
      {isErrorUserChatList && <span>Error component</span>}
      {isPendingUserChatList && <IosSpinner />}
    </Box>
  );
};
export default UserChatList;
