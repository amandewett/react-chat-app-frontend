import { Drawer, DrawerOverlay, DrawerContent } from "@chakra-ui/react";
import { MyDrawerProps } from "../utils/customTypes";

const MyDrawer = ({ children, onClose, isOpen }: MyDrawerProps) => {
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen} blockScrollOnMount={false}>
      <DrawerOverlay />
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
};
export default MyDrawer;
