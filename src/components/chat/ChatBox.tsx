import { Box } from "@chakra-ui/react";
import MyChatsList from "./MyChatsList";

const ChatBox = () => {
  return (
    <>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"} w={"100vw"} h={"90vh"}>
        <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} w={"90%"} h={"90%"} bgColor={"white"} textColor={"black"} rounded={"16px"}>
          <Box w={"40%"}>
            <MyChatsList />
          </Box>
          <Box w={"60%"} bgColor={"blueviolet"}>
            Chat Box
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default ChatBox;
