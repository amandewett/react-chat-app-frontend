import { Box } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../../store/context/chatContext";
import { MessageResponseProps } from "../../utils/customTypes";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { useCustomToast } from "../../hooks/useCustomToast";
import IosSpinner from "../IosSpinner";

const MessengerBody = () => {
  const { selectedChat, messages, setMessages, newMessagesCount } = useContext(ChatContext);
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
      const response: MessageResponseProps[] = data.data.result;
      if (response.length === 0) setIsFetchingMore(false);
      setMessages(response.reverse(), false, isFetchingMore);
    },
    onSettled: () => {},
  });

  useEffect(() => {
    setMessages([]);
    mutateMessageList();
  }, [selectedChat?.id]);

  useEffect(() => {
    if (!isFetchingMore) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      scrollToMessage();
    }

    setIsFetchingMore(false);

    if (boxRef.current) {
      boxRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (boxRef.current) {
        boxRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [messages]);

  const handleScroll = () => {
    if (boxRef.current) {
      if (boxRef.current.scrollTop === 0) {
        setIsFetchingMore(true);
        mutateMessageList();
      }
    }
  };

  const scrollToMessage = () => {
    if (arrMessagesRef.current[newMessagesCount]) {
      arrMessagesRef.current[newMessagesCount]?.scrollIntoView({ behavior: "instant", block: "center" });
    }
  };

  return (
    <Box overflowY={"auto"} h={"100%"} p={5} textColor={"white"} ref={boxRef as React.RefObject<HTMLDivElement>}>
      {isPendingMessageList && <IosSpinner />}
      {messages?.map((message: MessageResponseProps, index: number) => {
        return (
          <div key={message.id} className="text-7xl" ref={(el) => (arrMessagesRef.current[index] = el)}>
            {message.message}
          </div>
        );
      })}
      <span ref={bottomRef as React.RefObject<HTMLSpanElement>} />
    </Box>
  );
};
export default MessengerBody;