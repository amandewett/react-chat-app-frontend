import { Suspense, lazy, useContext } from "react";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";
import ChatListHeader from "./ChatListHeader";
import IosSpinner from "../IosSpinner";
import { ChatContext } from "../../store/context/chatContext";
import EmptyChatBox from "./EmptyChatBox";

const UserChatList = lazy(() => import("./UserChatList"));
const Messenger = lazy(() => import("././Messenger"));

const ChatBody = () => {
  const { selectedChat } = useContext(ChatContext);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.5, type: "tween", ease: "linear", delay: 1 }}>
      <Box display={"flex"} justifyContent={"space-between"} w={"100%"} h={"85vh"} px={"100px"} py={"50px"}>
        <Box w={"30%"} bgColor={"white"} rounded={"15px"} overflow={"hidden"}>
          <ChatListHeader />
          <Suspense fallback={<IosSpinner />}>
            <UserChatList />
          </Suspense>
        </Box>
        <Box w={"70%"} h={"100%"} bgColor={"white"} background={"linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../images/bg.webp')"} rounded={"15px"} backgroundSize={"cover"} ml={5}>
          {!selectedChat && <EmptyChatBox />}
          {selectedChat && (
            <Suspense>
              <Messenger />
            </Suspense>
          )}
        </Box>
      </Box>
    </motion.div>
  );
};
export default ChatBody;
