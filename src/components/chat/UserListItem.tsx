import { Avatar, Box, Text } from "@chakra-ui/react";
import { UserListItemProps } from "../../utils/customTypes";

const UserListItem = ({ id, name, email, profilePicture, handleOnClick }: UserListItemProps) => {
  return (
    <>
      <Box display="flex" flexDirection={"row"} bgColor={"#ECEFF1"} borderRadius={"16px"} p={"10px"} alignItems={"center"} cursor={"pointer"} onClick={() => handleOnClick(id)}>
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
