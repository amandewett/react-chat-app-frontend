import { Avatar, Box, Text } from "@chakra-ui/react";
import { UserListItemProps } from "../../utils/customTypes";
import { ChatContext } from "../../store/context/chatContext";
import { useContext } from "react";

const UserListItem = ({ id, name, email, profilePicture, handleOnClick, chatId }: UserListItemProps) => {
  const { selectedChat } = useContext(ChatContext);

  return (
    <>
      <Box
        display="flex"
        flexDirection={"row"}
        bgColor={chatId ? (selectedChat ? (chatId === selectedChat!.id ? "primaryColor" : "#ECEFF1") : "#ECEFF1") : "#ECEFF1"}
        textColor="textColor"
        _hover={{ bgColor: selectedChat ? (chatId === selectedChat!.id ? "primaryColor" : "hoverColor") : "hoverColor" }}
        borderRadius={"16px"}
        w={"100%"}
        p={"10px"}
        alignItems={"center"}
        cursor={"pointer"}
        className="transitions"
        onClick={() => handleOnClick(id)}
      >
        <Avatar name={name} src={profilePicture.includes("http") ? profilePicture : `${import.meta.env.VITE_SERVER_HOST}/${profilePicture}`} size={"sm"} />
        <Box display="flex" flexDirection={"column"} ml={"10px"}>
          <Text as={"b"}>{name}</Text>
          <Text textColor={"#616161"}>{email}</Text>
        </Box>
      </Box>
    </>
  );
};
export default UserListItem;
