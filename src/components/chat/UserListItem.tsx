import { Avatar, Box, Text } from "@chakra-ui/react";
import { UserListItemProps } from "../../utils/customTypes";
import { ChatContext } from "../../store/context/chatContext";
import { useContext } from "react";

const UserListItem = ({ id, name, email, profilePicture, handleOnClick, chatId, isForChatList = false, latestMessage, latestMessageSenderName }: UserListItemProps) => {
  const { selectedChat } = useContext(ChatContext);

  return (
    <>
      <Box
        display="flex"
        flexDirection={"row"}
        bgColor={chatId ? (selectedChat ? (chatId === selectedChat?.id ? "primaryColor" : "buttonColor") : "buttonColor") : "buttonColor"}
        textColor="textColor"
        _hover={{ bgColor: selectedChat ? (chatId === selectedChat?.id ? "primaryColor" : "hoverColor") : "hoverColor" }}
        borderRadius={"16px"}
        w={"100%"}
        p={"10px"}
        maxW={"100%"}
        alignItems={"center"}
        cursor={"pointer"}
        className="transitions"
        onClick={() => handleOnClick(id)}
      >
        <Avatar name={name} src={profilePicture?.includes("http") ? profilePicture : `${import.meta.env.VITE_SERVER_HOST}/${profilePicture}`} size={"sm"} />
        <Box display="flex" flexDirection={"column"} ml={"10px"} w={"100%"} overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"}>
          <Text as={"b"}>{name}</Text>
          {!isForChatList && <Text textColor={"#616161"}>{email}</Text>}
          {isForChatList && (
            <Box display={"flex"} w={"100%"}>
              {latestMessage && <Text mr={1} fontWeight={"500"}>{`${latestMessageSenderName}:`}</Text>}
              <Text w={"100%"} overflow={"hidden"} textOverflow={"ellipsis"}>
                {latestMessage ? latestMessage : "Send your first message..."}
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
export default UserListItem;
