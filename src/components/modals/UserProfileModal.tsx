import { DrawerHeader, ModalCloseButton, ModalBody, Avatar, Text, Box } from "@chakra-ui/react";
import { UserProfileModalProps } from "../../utils/customTypes";

const UserProfileModal = ({ userName, userEmail, userProfilePicture }: UserProfileModalProps) => {
  userProfilePicture = userProfilePicture ? (userProfilePicture.includes("http") ? userProfilePicture : `${import.meta.env.VITE_SERVER_HOST}/${userProfilePicture}`) : "";
  return (
    <>
      <DrawerHeader>
        <ModalCloseButton color="appPrimaryColor" />
      </DrawerHeader>
      <ModalBody display={"flex"} flexDir={"column"} alignItems={"start"} justifyContent={"center"}>
        <Avatar name={userName} src={userProfilePicture} size={"2xl"} alignSelf={"center"} />
        <Box my={10}>
          <Box display={"flex"} fontSize={"lg"}>
            <Text fontWeight={"700"} textColor="appHoverColor">
              Name:
            </Text>
            <Text fontWeight={"400"} ml={2} textTransform={"capitalize"} textColor="appTextColor">
              {userName}
            </Text>
          </Box>

          <Box display={"flex"} fontSize={"lg"}>
            <Text fontWeight={"700"} textColor="appHoverColor">
              Email:
            </Text>
            <Text fontWeight={"400"} ml={2} textTransform={"capitalize"} textColor="appTextColor">
              {userEmail}
            </Text>
          </Box>
        </Box>
      </ModalBody>
    </>
  );
};
export default UserProfileModal;
