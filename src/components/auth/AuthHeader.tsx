import { Box, Text } from "@chakra-ui/react";

const AuthHeader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      p={3}
      bg="white"
      w="100%"
      m="40px 0 0px 0"
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <Text fontSize={"x-large"} as={"b"}>
        Chit Chat
      </Text>
    </Box>
  );
};
export default AuthHeader;
