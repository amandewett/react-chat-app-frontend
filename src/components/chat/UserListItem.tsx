import { Avatar, Box, Text } from "@chakra-ui/react";
import { UserListItemProps } from "../../utils/customTypes";
import { AppContext } from "../../store/context/appContext";
import { useContext } from "react";

const UserListItem = ({ id, name, email, profilePicture, handleOnClick, chatId, isForChatList = false, latestMessage, latestMessageSenderName }: UserListItemProps) => {
  const { selectedChat } = useContext(AppContext);
  const isChatSelected = chatId && selectedChat && chatId === selectedChat?.id;

  return (
    <>
      <Box
        display="flex"
        flexDirection={"row"}
        bgColor={isChatSelected ? "appPrimaryColor" : "appListItemBgColor"}
        textColor={isChatSelected ? "appBgColor" : "appTextColor"}
        _hover={{ transform: "translateX(-0.5em)" }}
        borderRadius={"lg"}
        transition={"transform 0.4s ease"}
        w={"100%"}
        p={"10px"}
        maxW={"100%"}
        alignItems={"center"}
        cursor={"pointer"}
        onClick={() => handleOnClick(id)}
      >
        <Avatar name={name} src={profilePicture?.includes("http") ? profilePicture : `${import.meta.env.VITE_SERVER_HOST}/${profilePicture}`} size={"sm"} />
        <Box display="flex" flexDirection={"column"} ml={"10px"} w={"100%"} overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"}>
          <Text as={"b"}>{name}</Text>
          {!isForChatList && <Text textColor={"appHoverColor"}>{email}</Text>}
          {isForChatList && (
            <Box display={"flex"} w={"100%"}>
              {latestMessage && <Text mr={1} fontWeight={"500"} fontSize={"small"} textColor={isChatSelected ? "appBgColor" : "appHoverColor"}>{`${latestMessageSenderName}:`}</Text>}
              <Text w={"100%"} overflow={"hidden"} fontWeight={"400"} textOverflow={"ellipsis"} fontSize={"small"} textColor={isChatSelected ? "appBgColor" : "appGrayColor"}>
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
