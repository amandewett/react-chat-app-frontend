import { Menu, MenuButton, MenuItem, MenuList, Avatar, Button, Box, Tooltip, Text, useDisclosure, MenuDivider } from "@chakra-ui/react";
import { ChatContext } from "../../../store/context/chatContext";
import { useContext, Suspense, lazy } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";

const SearchDrawer = lazy(() => import("./SearchDrawer"));
const AppModalContainer = lazy(() => import("../../modals/AppModalContainer"));
const UserProfileModal = lazy(() => import("../../modals/UserProfileModal"));

const ChatHeaderContainer = () => {
  const { isOpen: isOpenSearchDrawer, onOpen: onOpenSearchDrawer, onClose: onCloseSearchDrawer } = useDisclosure();
  const { isOpen: isOpenProfileModal, onOpen: onOpenProfileModal, onClose: onCloseProfileModal } = useDisclosure();
  const { setUserDetails, userDetails, setSelectedChat, setChats } = useContext(ChatContext);

  const logout = () => {
    localStorage.removeItem("user");
    setSelectedChat(undefined);
    setChats([]);
    setUserDetails(undefined);
  };

  return (
    <>
      <section className="absolute z-0">
        <h1 className="capitalize font-bold w-full text-4xl">Chit chat</h1>
      </section>
      <section className="absolute z-10 flex justify-between w-full px-5">
        <nav>
          <Box onClick={onOpenSearchDrawer}>
            <Tooltip label="Search users to chat" hasArrow placement="bottom-end" defaultIsOpen={false}>
              <Button>
                <i className="fa-solid fa-magnifying-glass"></i>
                <Text casing="capitalize" pl={"5px"} display={{ base: "none", md: "inline" }}>
                  Search users
                </Text>
              </Button>
            </Tooltip>
          </Box>
          <Suspense>
            <SearchDrawer isOpen={isOpenSearchDrawer} onClose={onCloseSearchDrawer} />
          </Suspense>
        </nav>
        <div className="z-10">
          <Menu>
            <MenuButton as={Button} rightIcon={<BellIcon />} bgColor={"primaryColor"}>
              Notifications
            </MenuButton>
          </Menu>
          <span className="px-2" />
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {userDetails && (
                <Avatar
                  name={userDetails.name}
                  src={userDetails.profilePicture.includes("http") ? userDetails.profilePicture : `${import.meta.env.VITE_SERVER_HOST}/${userDetails.profilePicture}`}
                  size={"sm"}
                />
              )}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onOpenProfileModal}>My Profile</MenuItem>
              <Suspense>
                <AppModalContainer isOpen={isOpenProfileModal} onClose={onCloseProfileModal}>
                  <UserProfileModal userName={userDetails?.name} userEmail={userDetails?.email} userProfilePicture={userDetails?.profilePicture} />
                </AppModalContainer>
              </Suspense>
              <MenuDivider />
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </section>
    </>
  );
};
export default ChatHeaderContainer;
