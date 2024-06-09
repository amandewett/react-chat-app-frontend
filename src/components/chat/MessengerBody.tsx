import { Box } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../store/context/appContext";
import { MessageResponseProps, MessengerBodyProps } from "../../utils/customTypes";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { useCustomToast } from "../../hooks/useCustomToast";
import IosSpinner from "../IosSpinner";
import MessageBubble from "./MessageBubble";

const MessengerBody = ({ socket }: MessengerBodyProps) => {
  const { selectedChat, messages, setMessages, newMessagesCount } = useContext(AppContext);
  const toast = useCustomToast();
  const bottomRef: React.MutableRefObject<HTMLSpanElement | undefined> = useRef<HTMLSpanElement>();
  const boxRef: React.MutableRefObject<HTMLDivElement | undefined> = useRef<HTMLDivElement>();
  const arrMessagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { mutate: mutateMessageList, isPending: isPendingMessageList } = useMutation({
    mutationFn: () => axiosInstance.get(`api/message/all/${selectedChat?.id}`, { params: { skip: messages.length } }),
    onError(error: any) {
      toast({
        title: error.response.data.message,
        status: "error",
      });
    },
    onSuccess: (data: any) => {
      //join chat room using socket
      if (!isFetchingMore && selectedChat) socket?.emit("joinChatRoom", selectedChat?.id);

      const response: MessageResponseProps[] = data.data.result;
      if (response.length === 0) setIsFetchingMore(false);
      setMessages(response.reverse(), false, isFetchingMore);
    },
    onSettled: () => {},
  });

  useEffect(() => {
    setMessages([], false, false);
    mutateMessageList();
  }, [selectedChat?.id]);

  useEffect(() => {
    if (isFetchingMore) {
      mutateMessageList();
    }
  }, [isFetchingMore]);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.addEventListener("scroll", handleScroll);
    }

    if (!isFetchingMore) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      scrollToMessage();
    }

    setIsFetchingMore(false);

    return () => {
      if (boxRef.current) {
        boxRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [messages]);

  const handleScroll = () => {
    if (boxRef.current) {
      if (boxRef.current.scrollTop === 0 && boxRef.current.scrollHeight > boxRef.current.clientHeight) {
        setIsFetchingMore(true);
      }
    }
  };

  const scrollToMessage = () => {
    if (arrMessagesRef.current[newMessagesCount]) {
      arrMessagesRef.current[newMessagesCount]?.scrollIntoView({ behavior: "instant", block: "center" });
    }
  };

  return (
    <Box overflowY={"auto"} overflowX={"hidden"} h={"100%"} p={5} ref={boxRef as React.RefObject<HTMLDivElement>}>
      {isPendingMessageList && <IosSpinner />}
      {messages?.map((message: MessageResponseProps, index: number) => {
        return <MessageBubble key={message.id} messages={messages} index={index} currentMessage={message} myRef={(el: HTMLDivElement) => (arrMessagesRef.current[index] = el)} />;
      })}
      <span ref={bottomRef as React.RefObject<HTMLSpanElement>} />
    </Box>
  );
};
export default MessengerBody;
