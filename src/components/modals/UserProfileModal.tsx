import { DrawerHeader, ModalCloseButton, ModalBody, Avatar, Text, Box } from "@chakra-ui/react";
import { UserProfileModalProps } from "../../utils/customTypes";

const UserProfileModal = ({ userName, userEmail, userProfilePicture }: UserProfileModalProps) => {
  userProfilePicture = userProfilePicture ? (userProfilePicture.includes("http") ? userProfilePicture : `${import.meta.env.VITE_SERVER_HOST}/${userProfilePicture}`) : "";
  return (
    <>
      <DrawerHeader>
        <ModalCloseButton />
      </DrawerHeader>
      <ModalBody display={"flex"} flexDir={"column"} alignItems={"start"} justifyContent={"center"}>
        <Avatar name={userName} src={userProfilePicture} size={"2xl"} alignSelf={"center"} />
        <Box my={10}>
          <Box display={"flex"} fontSize={"lg"}>
            <Text fontWeight={"700"}>Name:</Text>
            <Text fontWeight={"400"} ml={2} textTransform={"capitalize"}>
              {userName}
            </Text>
          </Box>
          <Box display={"flex"} fontSize={"lg"}>
            <Text fontWeight={"700"}>Email:</Text>
            <Text fontWeight={"400"} ml={2} textTransform={"lowercase"}>
              {userEmail}
            </Text>
          </Box>
        </Box>
      </ModalBody>
    </>
  );
};
export default UserProfileModal;
