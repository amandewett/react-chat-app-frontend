import { Box, Text } from "@chakra-ui/react";

const AuthHeader = () => {
  return (
    <Box display="flex" justifyContent="center" p={[2, 3]} bg="appBgColor" textColor={"appTextColor"} w={["100%"]} m="40px 0 0px 0" borderRadius={"lg"}>
      <Text as={"b"} fontSize={["x-large"]}>
        Chit Chat
      </Text>
    </Box>
  );
};
export default AuthHeader;
