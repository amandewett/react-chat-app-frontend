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
        bgColor={chatId ? (selectedChat ? (chatId === selectedChat!.id ? "#B0BEC5" : "#ECEFF1") : "#ECEFF1") : "#ECEFF1"}
        _hover={{ bgColor: selectedChat ? (chatId === selectedChat!.id ? "#CFD8DC" : "#CFD8DC") : "#CFD8DC" }}
        transition={"all 0.4s 0s linear"}
        borderRadius={"16px"}
        p={"10px"}
        alignItems={"center"}
        cursor={"pointer"}
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
