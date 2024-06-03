import { useContext, useState } from "react";
import { ChatContext } from "../../store/context/chatContext";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import SideDrawer from "./SideDrawer";
import { Avatar, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";
import SearchDrawer from "./SearchDrawer";

const ChatHeader = () => {
  const { setUserDetails, userDetails } = useContext(ChatContext);
  const { scrollY } = useScroll();
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: searchDrawerIsOpen, onOpen: searchDrawerOnOpen, onClose: searchDrawerOnClose } = useDisclosure();

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    latest >= 200 ? setIsSticky(true) : setIsSticky(false);
  });

  const logout = () => {
    localStorage.removeItem("user");
    setUserDetails(undefined);
  };

  return (
    <>
      <header className="h-16 bg-white drop-shadow-lg flex items-center justify-center relative">
        <section className="absolute z-0">
          <h1 className="capitalize font-bold w-full text-4xl">Chit chat</h1>
        </section>
        <section className="absolute z-10 flex justify-between w-full px-5">
          <nav>
            <SideDrawer onClick={searchDrawerOnOpen} />
            <SearchDrawer isOpen={searchDrawerIsOpen} onClose={searchDrawerOnClose} />
          </nav>
          <div>
            <Menu>
              <MenuButton as={Button} rightIcon={<BellIcon />}>
                Notifications
              </MenuButton>
              <MenuList></MenuList>
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
                <MenuItem onClick={onOpen}>My Profile</MenuItem>
                <ProfileModal isOpen={isOpen} onClose={onClose} />
                <MenuDivider />
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </section>
      </header>
      <motion.header
        className={`h-14 bg-white drop-shadow-lg flex items-center justify-center relative ${isSticky ? "sticky top-0" : "hidden"}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isSticky ? 1 : 0, y: isSticky ? 0 : -10 }}
        transition={{ type: "spring", stiffness: 50, duration: 1 }}
      >
        <section className="absolute z-0">
          <h1 className="capitalize font-bold w-full text-4xl">Chit chat</h1>
        </section>
        <section className="absolute z-10 flex justify-between w-full px-5">
          <nav>
            <SideDrawer onClick={searchDrawerOnOpen} />
            <SearchDrawer isOpen={searchDrawerIsOpen} onClose={searchDrawerOnClose} />
          </nav>
          <div>
            <Menu>
              <MenuButton as={Button} rightIcon={<BellIcon />}>
                Notifications
              </MenuButton>
              <MenuList></MenuList>
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
                <MenuItem onClick={onOpen}>My Profile</MenuItem>
                <ProfileModal isOpen={isOpen} onClose={onClose} />
                <MenuDivider />
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </section>
      </motion.header>
    </>
  );
};
export default ChatHeader;
