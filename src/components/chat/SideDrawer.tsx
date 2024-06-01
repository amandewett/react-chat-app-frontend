import { Box, Button, Text, Tooltip } from "@chakra-ui/react";

const SideDrawer = ({ onClick }: any) => {
  return (
    <>
      <Box onClick={onClick}>
        <Tooltip label="Search users to chat" hasArrow placement="bottom-end" defaultIsOpen={false}>
          <Button variant="ghost" bgColor={"#ECEFF1"}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text casing="capitalize" pl={"5px"} display={{ base: "none", md: "inline" }}>
              Search users
            </Text>
          </Button>
        </Tooltip>
      </Box>
    </>
  );
};
export default SideDrawer;
