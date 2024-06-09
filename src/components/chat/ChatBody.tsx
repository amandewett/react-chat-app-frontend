import { Suspense, lazy, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";
import ChatListHeader from "./ChatListHeader";
import IosSpinner from "../IosSpinner";
import { AppContext } from "../../store/context/appContext";
import EmptyChatBox from "./EmptyChatBox";
import io, { Socket } from "socket.io-client";
import { MessageResponseProps } from "../../utils/customTypes";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

const UserChatList = lazy(() => import("./UserChatList"));
const Messenger = lazy(() => import("././Messenger"));
let socket: Socket;

type NewMessageType = {
  payload: MessageResponseProps;
  arrOtherUsers: string[];
};

const ChatBody = () => {
  const { selectedChat, userDetails, setMessages, setChats, setNotification, notifications, setIsSocketConnected } = useContext(AppContext);
  const { mutate: mutateChatList } = useMutation({
    mutationFn: () => axiosInstance.get(`api/chat/all`),
    onSuccess(data: any) {
      setChats(data.data.result);
    },
  });

  useEffect(() => {
    socket = io(import.meta.env.VITE_SERVER_HOST);
    if (userDetails) socket.emit("createRoom", userDetails);
    socket.on("connected", () => setIsSocketConnected(true));
    socket.on("disconnect", () => setIsSocketConnected(false));
    return () => {
      socket.disconnect();
    };
  }, [userDetails]);

  useEffect(() => {
    const handleMessageReceived = (data: any) => {
      const { payload, arrOtherUsers }: NewMessageType = data;

      //handle new message for messageBox
      if (selectedChat && payload.chatId === selectedChat.id) {
        //update messages
        setMessages(Array(payload), true);
      } else {
        //send notification
        setNotification([payload, ...notifications]);
      }

      //handle chat list
      const isForMyChats = arrOtherUsers.includes(userDetails!.id);
      if (isForMyChats) {
        //refresh chat list
        mutateChatList();
      }
    };
    socket.on("newMessageReceived", handleMessageReceived);
    return () => {
      socket.off("newMessageReceived", handleMessageReceived);
    };
  }, [selectedChat, notifications]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.5, type: "tween", ease: "linear", delay: 1 }}>
      <Box display={"flex"} justifyContent={"space-between"} w={"100%"} h={["90vh", "89vh", "88vh", "86vh"]} px={["1em", "2em", "3em", "4em"]} py={["1em", "2em", "3em"]} textColor={"appTextColor"}>
        <Box
          w={["100%", "100%", "100%", "100%", "30%"]}
          overflow={"hidden"}
          rounded="lg"
          borderWidth={2}
          borderColor={"appHoverColor"}
          bgColor="appBgColor"
          display={selectedChat ? ["none", "none", "none", "none", "inline"] : ["inline", "inline", "inline", "inline", "inline"]}
        >
          <ChatListHeader />
          <Suspense fallback={<IosSpinner />}>
            <UserChatList socket={socket} />
          </Suspense>
        </Box>
        <Box
          w={["100%", "100%", "100%", "100%", "70%"]}
          h={"100%"}
          background={"linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../images/bg.webp')"}
          rounded={"lg"}
          bgColor="appBgColor"
          display={selectedChat ? ["inline", "inline", "inline", "inline", "inline"] : ["none", "none", "none", "none", "inline"]}
          backgroundSize={"cover"}
          ml={5}
        >
          {!selectedChat && <EmptyChatBox />}
          {selectedChat && (
            <Suspense>
              <Messenger socket={socket} />
            </Suspense>
          )}
        </Box>
      </Box>
    </motion.div>
  );
};
export default ChatBody;
