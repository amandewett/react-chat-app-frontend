import { Box, Text, Button, useDisclosure, Menu, Input, Textarea } from "@chakra-ui/react";
import MyChatsList from "./MyChatsList";
import { ChatContext } from "../../store/context/chatContext";
import { useContext, useState } from "react";
import { ViewIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";
import MessageBox from "./MessageBox";
import MyInput from "../MyInputs/MyInput";
import EmptyChatBox from "./EmptyChatBox";
import CreateGroupChatModal from "./CreateGroupChatModal";
import { UserType } from "../../utils/customTypes";

const ChatBox = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenCreateGroupModal, onOpen: onOpenCreateGroupModal, onClose: onCloseCreateGroupModal } = useDisclosure();
  const { selectedChat, userDetails } = useContext(ChatContext);
  const [chatMessage, setUserMessage] = useState("");
  const chatName: string = selectedChat
    ? selectedChat.isGroupChat
      ? selectedChat.chatName ?? ""
      : selectedChat.participants[0].name === userDetails.name
      ? selectedChat.participants[1].name
      : selectedChat.participants[0].name
    : "";
  const chatEmail: string = selectedChat
    ? selectedChat.isGroupChat
      ? selectedChat.chatName ?? ""
      : selectedChat.participants[0].name === userDetails.name
      ? selectedChat.participants[1].email
      : selectedChat.participants[0].email
    : "";
  const chatProfilePicture: string = selectedChat
    ? selectedChat.isGroupChat
      ? selectedChat.chatName ?? ""
      : selectedChat.participants[0].name === userDetails.name
      ? selectedChat.participants[1].profilePicture
      : selectedChat.participants[0].profilePicture
    : "";

  return (
    <>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"} w={"100vw"} h={"90vh"}>
        <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"} w={"90%"} h={"90%"} textColor={"black"} bgColor={"transparent"}>
          <Box w={{ base: "100%", md: "40%", lg: "30%" }} bgColor={"white"} rounded={"15px"}>
            <MyChatsList />
          </Box>
          {/* message box */}
          {selectedChat ? (
            <Box
              w={{ lg: "70%", md: "60%" }}
              bgColor={"white"}
              ml={"10px"}
              rounded={"15px"}
              background={"linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../images/chat_bg.webp')"}
              display={{ base: "none", md: "flex" }}
              flexDirection={"column"}
              backgroundSize={"cover"}
              className="bg-no-repeat bg-center"
            >
              <Box display={"flex"} justifyContent={"space-between"} p={"10px"} bgColor={"white"} h={"10%"} w={"100%"} roundedTopLeft={"15px"} roundedTopRight={"15px"}>
                <Text fontSize={"x-large"} fontWeight={"400"}>
                  {chatName}
                </Text>
                {selectedChat && (
                  <Menu>
                    <Button display={"flex"} justifyContent={"space-between"} alignItems={"center"} onClick={selectedChat.isGroupChat ? onOpenCreateGroupModal : onOpen}>
                      <ViewIcon />
                    </Button>
                    {!selectedChat.isGroupChat && (
                      <ProfileModal isOpen={isOpen} onClose={onClose} isForOtherUser={true} userName={chatName} userEmail={chatEmail} profilePicture={chatProfilePicture} />
                    )}
                    {selectedChat.isGroupChat && (
                      <CreateGroupChatModal isOpen={isOpenCreateGroupModal} onClose={onCloseCreateGroupModal} groupName={chatName} groupParticipants={selectedChat.participants as UserType[]} />
                    )}
                  </Menu>
                )}
              </Box>
              <Box overflowX={"hidden"} overflowY={"auto"} textColor={"white"} h={"80%"}>
                <Box p={"10px"}>
                  <MessageBox />
                </Box>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"} alignItems={"end"} bgColor={"transparent"} h={"10%"} w={"100%"} roundedBottomLeft={"15px"} roundedBottomRight={"15px"}>
                <Textarea onChange={(e) => setUserMessage(e.target.value)} value={chatMessage} bgColor={"white"} placeholder="Type..." h={"100%"} resize={"none"} rows={1} />
                <Button bgColor={"primaryColor"} ml={"10px"} minW={"100px"} h={"100%"}>
                  Send
                </Button>
              </Box>
            </Box>
          ) : (
            <EmptyChatBox />
          )}
        </Box>
      </Box>
    </>
  );
};
export default ChatBox;
