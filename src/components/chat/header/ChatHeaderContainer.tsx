import { Menu, MenuButton, MenuItem, MenuList, Avatar, Button, Box, Tooltip, Text, useDisclosure, MenuDivider, HStack, VStack } from "@chakra-ui/react";
import { AppContext } from "../../../store/context/appContext";
import { useContext, Suspense, lazy, useEffect } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { motion, useTransform, useMotionValue, animate } from "framer-motion";
import { MessageResponseProps } from "../../../utils/customTypes";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../utils/axiosInstance";
import { useCustomToast } from "../../../hooks/useCustomToast";
import AppMenuListItem from "./AppMenuListItem";

const SearchDrawer = lazy(() => import("./SearchDrawer"));
const AppModalContainer = lazy(() => import("../../modals/AppModalContainer"));
const UserProfileModal = lazy(() => import("../../modals/UserProfileModal"));

const ChatHeaderContainer = () => {
  const { isOpen: isOpenSearchDrawer, onOpen: onOpenSearchDrawer, onClose: onCloseSearchDrawer } = useDisclosure();
  const { isOpen: isOpenProfileModal, onOpen: onOpenProfileModal, onClose: onCloseProfileModal } = useDisclosure();
  const { setUserDetails, userDetails, setSelectedChat, setChats, setMessages, notifications, selectedChat } = useContext(AppContext);
  const initialCount = useMotionValue(0);
  const rounded = useTransform(initialCount, Math.round);
  const toast = useCustomToast();

  useEffect(() => {
    const animation = animate(initialCount, notifications.length, {
      duration: 1,
    });
    return animation.stop;
  }, [notifications.length]);

  const { mutate: mutateChatDetails } = useMutation({
    mutationFn: (chatId: string) => axiosInstance.get(`api/chat/group/details/${chatId}`),

    onError(error: any) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
      });
    },
    onSuccess(data: any) {
      if (data.data.result !== selectedChat) setSelectedChat(data.data.result);
    },
  });

  const handleOnNotificationClick = (chatId: string) => mutateChatDetails(chatId);

  const logout = () => {
    localStorage.removeItem("user");
    setSelectedChat(undefined);
    setChats([]);
    setUserDetails(undefined);
    setMessages([]);
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
              <Button bgColor={"appPrimaryColor"} textColor={"appBgColor"} _hover={{ bgColor: "appHoverColor" }}>
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
            <MenuButton
              as={Button}
              rightIcon={<motion.div>{rounded}</motion.div>}
              bgColor={`${notifications.length === 0 ? "appListItemBgColor" : "appPrimaryColor"}`}
              textColor={`${notifications.length === 0 ? "appHoverColor" : "appBgColor"}`}
              _hover={{ bgColor: `${notifications.length === 0 ? "appListItemBgColor" : "appHoverColor"}` }}
            >
              Notifications
            </MenuButton>
            <MenuList border={0} bgColor={"transparent"}>
              {notifications.length > 0 &&
                notifications.map((notification: MessageResponseProps) => (
                  <AppMenuListItem key={notification.id} onClick={() => handleOnNotificationClick(notification.chatId)}>
                    <HStack>
                      <Avatar
                        name={notification.sender.name}
                        size={"sm"}
                        src={notification.sender?.profilePicture?.includes("http") ? notification.sender?.profilePicture : `${import.meta.env.VITE_SERVER_HOST}/${notification.sender?.profilePicture}`}
                      />
                      <VStack alignItems={"start"} spacing={1} minW={"15rem"} maxW={"25rem"}>
                        <Text as={"b"}>{notification.sender.name}</Text>
                        <Text textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"} maxW={"100%"}>
                          {notification.message}
                        </Text>
                      </VStack>
                    </HStack>
                  </AppMenuListItem>
                ))}
              {notifications.length === 0 && <AppMenuListItem onClick={() => {}}>No notifications</AppMenuListItem>}
            </MenuList>
          </Menu>
          <span className="px-2" />
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bgColor="appPrimaryColor" textColor={"appBgColor"}>
              {userDetails && (
                <Avatar
                  name={userDetails?.name}
                  src={userDetails?.profilePicture?.includes("http") ? userDetails?.profilePicture : `${import.meta.env.VITE_SERVER_HOST}/${userDetails?.profilePicture}`}
                  size={"sm"}
                />
              )}
            </MenuButton>
            <MenuList border={0} bgColor={"transparent"}>
              <AppMenuListItem onClick={onOpenProfileModal}>My Profile</AppMenuListItem>
              <Suspense>
                <AppModalContainer isOpen={isOpenProfileModal} onClose={onCloseProfileModal}>
                  <UserProfileModal userName={userDetails?.name} userEmail={userDetails?.email} userProfilePicture={userDetails?.profilePicture} />
                </AppModalContainer>
              </Suspense>
              <AppMenuListItem onClick={logout}>Logout</AppMenuListItem>
            </MenuList>
          </Menu>
        </div>
      </section>
    </>
  );
};
export default ChatHeaderContainer;
