import { useContext } from "react";
import { MessageBubbleProps } from "../../utils/customTypes";
import { AppContext } from "../../store/context/appContext";
import { isSameSender, isLastMessage } from "../../utils/messagesLogic";
import { Avatar, Box, HStack, Text, Tooltip, Wrap } from "@chakra-ui/react";

const MessageBubble = ({ messages, index, currentMessage, myRef }: MessageBubbleProps) => {
  const { userDetails } = useContext(AppContext);
  const isSameSenderValue: boolean = isSameSender(messages, currentMessage, index);
  const isLastMessageValue: boolean = isLastMessage(messages, index);

  return (
    <Box as={"div"} ref={myRef} w={"100%"} display={"flex"} justifyContent={`${userDetails?.id === currentMessage.senderId ? "end" : "start"}`} mb={2}>
      {userDetails?.id === currentMessage.senderId && (
        <Box display={"flex"} maxW={"80%"}>
          <Wrap
            p={2}
            marginRight={`${isLastMessageValue ? "1rem" : !isLastMessageValue && isSameSenderValue ? "1rem" : "3rem"}`}
            rounded={"8px"}
            h={"auto"}
            bgColor="appPrimaryColor"
            textColor="appBgColor"
            display={"flex"}
            flexDirection={"column"}
          >
            <Text textAlign={"end"} w={"100%"}>
              {currentMessage.message}
            </Text>
          </Wrap>
          {isLastMessageValue && (
            <Tooltip label={currentMessage.sender.name}>
              <Avatar
                name={currentMessage.sender.name}
                size="sm"
                alignSelf={"end"}
                src={`${
                  currentMessage.sender.profilePicture?.includes("http") ? `${currentMessage.sender.profilePicture}` : `${import.meta.env.VITE_SERVER_HOST}/${currentMessage.sender.profilePicture}`
                }`}
              />
            </Tooltip>
          )}
          {!isLastMessageValue && isSameSenderValue && (
            <Tooltip label={currentMessage.sender.name}>
              <Avatar
                name={currentMessage.sender.name}
                size="sm"
                alignSelf={"end"}
                src={`${
                  currentMessage.sender.profilePicture?.includes("http") ? `${currentMessage.sender.profilePicture}` : `${import.meta.env.VITE_SERVER_HOST}/${currentMessage.sender.profilePicture}`
                }`}
              />
            </Tooltip>
          )}
        </Box>
      )}
      {userDetails?.id !== currentMessage.senderId && (
        <Box display={"flex"} maxW={"80%"}>
          {isLastMessageValue && (
            <Tooltip label={currentMessage.sender.name}>
              <Avatar
                name={currentMessage.sender.name}
                size="sm"
                alignSelf={"end"}
                src={`${
                  currentMessage.sender.profilePicture?.includes("http") ? `${currentMessage.sender.profilePicture}` : `${import.meta.env.VITE_SERVER_HOST}/${currentMessage.sender.profilePicture}`
                }`}
              />
            </Tooltip>
          )}
          {!isLastMessageValue && isSameSenderValue && (
            <Tooltip label={currentMessage.sender.name}>
              <Avatar
                name={currentMessage.sender.name}
                size="sm"
                alignSelf={"end"}
                src={`${
                  currentMessage.sender.profilePicture?.includes("http") ? `${currentMessage.sender.profilePicture}` : `${import.meta.env.VITE_SERVER_HOST}/${currentMessage.sender.profilePicture}`
                }`}
              />
            </Tooltip>
          )}
          <Wrap
            p={2}
            marginLeft={`${isLastMessageValue ? "1rem" : !isLastMessageValue && isSameSenderValue ? "1rem" : "3rem"}`}
            rounded={"10px"}
            h={"auto"}
            bgColor="appListItemBgColor"
            textColor="appPrimaryColor"
            display={"flex"}
            flexDirection={"column"}
          >
            <Text textAlign={"start"} w={"100%"} as={"b"} textColor={"appHoverColor"}>
              {currentMessage.sender.name}
            </Text>
            <Text textAlign={"start"} w={"100%"} textColor={"appPrimaryColor"}>
              {currentMessage.message}
            </Text>
          </Wrap>
        </Box>
      )}
    </Box>
  );
};
export default MessageBubble;

/* 
<>
            {userDetails?.id === message.senderId ? (
              <div key={message.id} className="text-7xl bg-teal-400 text-right" ref={(el) => (arrMessagesRef.current[index] = el)}>
                {isLastMessage(messages, index) ? <div>{`== ${message.message}`}</div> : isSameSender(messages, message, index) ? <div>{`== ${message.message}`}</div> : <div>{message.message}</div>}
              </div>
            ) : (
              <div key={message.id} className="text-7xl bg-rose-400" ref={(el) => (arrMessagesRef.current[index] = el)}>
                {isLastMessage(messages, index) ? <div>{`== ${message.message}`}</div> : isSameSender(messages, message, index) ? <div>{`== ${message.message}`}</div> : <div>{message.message}</div>}
              </div>
            )}
          </> */
