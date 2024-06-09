import { MenuItem } from "@chakra-ui/react";
import { AppMenuListItemProps } from "../../../utils/customTypes";

const AppMenuListItem = ({ onClick, title, children }: AppMenuListItemProps) => {
  return (
    <MenuItem
      onClick={onClick}
      bgColor={"appBgColor"}
      textColor={"appTextColor"}
      _hover={{ bgColor: "appLightHoverColor", textColor: "appBgColor" }}
      transition="all 0.2s ease-in-out"
      rounded={"lg"}
      m={2}
    >
      {title ? title : children}
    </MenuItem>
  );
};
export default AppMenuListItem;
