import { Avatar, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import { MyTagProps } from "../../utils/customTypes";
import { ChatContext } from "../../store/context/chatContext";
import { useContext } from "react";

const MyTag = ({ profilePicture, userName, handleDelete, userId, groupAdminId, isCreating }: MyTagProps) => {
  const { userDetails } = useContext(ChatContext);

  return (
    <Tag size={"lg"} colorScheme="appColorScheme" borderRadius={"full"}>
      <Avatar src={profilePicture?.includes("http") ? profilePicture : `${import.meta.env.VITE_SERVER_HOST}/${profilePicture}`} size={"xs"} ml={-1} mr={2} />
      <TagLabel>{userName}</TagLabel>
      {isCreating ? <TagCloseButton onClick={() => handleDelete(userId)} /> : userDetails?.id === groupAdminId && userId !== groupAdminId && <TagCloseButton onClick={() => handleDelete(userId)} />}
    </Tag>
  );
};
export default MyTag;
