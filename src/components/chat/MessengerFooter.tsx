import { Box, Button, FormControl, HStack, InputGroup, InputRightAddon, InputRightElement, Textarea } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import React, { LegacyRef, useContext, useEffect, useRef, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { ChatContext } from "../../store/context/chatContext";
import { useCustomToast } from "../../hooks/useCustomToast";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { MessageResponseProps } from "../../utils/customTypes";

const MessengerFooter = () => {
  const { selectedChat, setChats, messages, setMessages } = useContext(ChatContext);
  const toast = useCustomToast();
  const [messageValue, setMessageValue] = useState<string>("");
  const [messageValueBackup, setMessageValueBackup] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [messageValue]);

  useEffect(() => {
    textAreaRef?.current?.focus();
  }, []);

  const { mutate: mutateAllChats } = useMutation({
    mutationFn: () => axiosInstance.get(`api/chat/all`),
    onSettled: () => {},
    onError(error: any) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
      });
    },
    onSuccess(data: any) {
      setChats(data.data.result);
    },
  });

  const { mutate: mutateSendMessage } = useMutation({
    mutationFn: (body: any) => axiosInstance.post(`api/message/send/${selectedChat?.id}`, body),
    onError(error: any) {
      setMessageValue(messageValueBackup);
      console.log(error);
      toast({
        title: "Error",
        description: "Unable to send message",
        status: "error",
      });
    },
    onSuccess(data: any) {
      setMessageValueBackup("");
      //mutate all messages
      setMessages(Array(data.data.result as MessageResponseProps), true);
      mutateAllChats();
    },
  });

  const { mutate: mutateMessageList } = useMutation({
    mutationFn: () => axiosInstance.get(`api/message/all/${selectedChat?.id}`, { params: { skip: messages.length } }),
    onError(error: any) {
      toast({
        title: error.response.data.message,
        status: "error",
      });
    },
    onSuccess: (data: any) => {
      const response: MessageResponseProps[] = data.data.result;
      setMessages(response.reverse());
    },
    onSettled: () => {},
  });

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      handleMessageSubmit(e);
    }
  };

  const handleMessageSubmit = (e?: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    e?.preventDefault();
    if (messageValue) {
      setMessageValueBackup(messageValue.trim());
      mutateSendMessage({ message: messageValue.trim() });
      setMessageValue("");
    }
  };

  return (
    <form onSubmit={handleMessageSubmit} autoComplete="off" noValidate className="h-full">
      <HStack spacing={2} bgColor={"white"} h={"100%"} w={"100%"} roundedBottomLeft={"15px"} roundedBottomRight={"15px"} display={"flex"} alignItems={"end"}>
        <FormControl isRequired>
          <InputGroup display={"flex"} bgColor={"white"} roundedBottomLeft={"15px"} roundedBottomRight={"15px"}>
            <Textarea
              ref={textAreaRef}
              bgColor={"white"}
              rows={1}
              value={messageValue}
              flex="0.97"
              minH={"40px"}
              maxH={"150px"}
              onChange={(e) => setMessageValue(e.target.value)}
              resize={"none"}
              overflow={"hidden"}
              placeholder="Type message..."
              border={"none"}
              _focusVisible={{ borderColor: "primaryColor", borderWidth: "2px" }}
              onKeyDown={handleOnKeyDown}
            />
            <InputRightElement
              alignSelf={"end"}
              mr={1}
              mb={1}
              justifySelf={"center"}
              bottom={0}
              rounded={"50%"}
              bgColor={"primaryColor"}
              onClick={() => {
                handleMessageSubmit;
              }}
              as={"button"}
              type="submit"
              transition={"transform 0.3s ease"}
              _hover={{ transform: "translateY(-0.1em)" }}
            >
              <ArrowUpIcon color={"textColor"} boxSize={"2rem"} />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </HStack>
    </form>
  );
};
export default MessengerFooter;
