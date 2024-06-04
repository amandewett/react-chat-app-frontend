import { Avatar, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import { MyTagType } from "../../utils/customTypes";

const MyTag = ({ profilePicture, userName }: MyTagType) => {
  return (
    <Tag size={"lg"} colorScheme="amberScheme" borderRadius={"full"}>
      <Avatar src={profilePicture.includes("http") ? profilePicture : `${import.meta.env.VITE_SERVER_HOST}/${profilePicture}`} size={"xs"} ml={-1} mr={2} />
      <TagLabel>{userName}</TagLabel>
      <TagCloseButton />
    </Tag>
  );
};
export default MyTag;
