import { Box, Text } from "@chakra-ui/react";

const EmptyChatBox = () => {
  return (
    <Box w={"100%"} h={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={"center"} rounded="lg" borderWidth={2} borderColor={"appHoverColor"}>
      <Text fontSize={"3xl"} textColor={"appHoverColor"} fontWeight={"600"}>
        Click on a chat to start messaging!
      </Text>
    </Box>
  );
};
export default EmptyChatBox;
