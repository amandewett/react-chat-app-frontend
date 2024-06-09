import { Avatar, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import { MyTagProps } from "../../utils/customTypes";
import { AppContext } from "../../store/context/appContext";
import { useContext } from "react";

const MyTag = ({ profilePicture, userName, handleDelete, userId, groupAdminId, isCreating }: MyTagProps) => {
  const { userDetails } = useContext(AppContext);

  return (
    <Tag size={"lg"} borderRadius={"full"} bgColor="appPrimaryColor">
      <Avatar src={profilePicture?.includes("http") ? profilePicture : `${import.meta.env.VITE_SERVER_HOST}/${profilePicture}`} size={"xs"} ml={-1} mr={2} />
      <TagLabel textColor="appBgColor">{userName}</TagLabel>
      {isCreating ? (
        <TagCloseButton color="appBgColor" onClick={() => handleDelete(userId)} />
      ) : (
        userDetails?.id === groupAdminId && userId !== groupAdminId && <TagCloseButton color="appBgColor" onClick={() => handleDelete(userId)} />
      )}
    </Tag>
  );
};
export default MyTag;
