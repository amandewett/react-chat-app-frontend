import { Drawer, DrawerOverlay, DrawerContent } from "@chakra-ui/react";
import { AppDrawerContainerProps } from "../../utils/customTypes";

const AppDrawerContainer = ({ children, onClose, isOpen }: AppDrawerContainerProps) => {
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen} blockScrollOnMount={false}>
      <DrawerOverlay />
      <DrawerContent bgColor={"appBgColor"}>{children}</DrawerContent>
    </Drawer>
  );
};
export default AppDrawerContainer;
