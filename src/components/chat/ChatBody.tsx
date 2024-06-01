import { useContext } from "react";
import { ChatContext } from "../../store/context/chatContext";
import ChatBox from "./ChatBox";
import { Box } from "@chakra-ui/react";
import MyChats from "./MyChats";

const ChatBody = () => {
  const { userDetails, selectedChat } = useContext(ChatContext);

  return (
    <>
      <Box display={"flex"} justifyContent={"space-between"} w={"100%"} h={"91.5vh"} className="text-white" padding={"10px"}>
        {userDetails && <MyChats />}
        {userDetails && <ChatBox />}
        {JSON.stringify(selectedChat)}
      </Box>
    </>
  );
};
export default ChatBody;
