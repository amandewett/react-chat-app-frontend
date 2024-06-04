import { Box, Text } from "@chakra-ui/react";

const EmptyChatBox = () => {
  return (
    <Box
      w={{ lg: "70%", md: "60%" }}
      bgColor={"white"}
      ml={"10px"}
      rounded={"15px"}
      display={{ base: "none", md: "flex" }}
      flexDirection={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundSize={"cover"}
      textAlign={"center"}
      className="bg-no-repeat bg-center"
    >
      <Text fontSize={"4xl"} textColor={"#90A4AE"}>
        Select a chat to start messaging
      </Text>
    </Box>
  );
};
export default EmptyChatBox;
