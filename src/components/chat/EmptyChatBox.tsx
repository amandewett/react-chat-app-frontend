import { Box, Text } from "@chakra-ui/react";

const EmptyChatBox = () => {
  return (
    <Box w={"100%"} h={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={"center"}>
      <Text fontSize={"3xl"} textColor={"buttonColor"} fontWeight={"600"}>
        Click on a chat to start messaging!
      </Text>
    </Box>
  );
};
export default EmptyChatBox;
