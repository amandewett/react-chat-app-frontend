import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../store/context/chatContext";
import ChatHeader from "../components/chat/ChatHeader";
import ChatBody from "../components/chat/ChatBody";

const ChatPage = () => {
  const navigate = useNavigate();
  const { userDetails } = useContext(ChatContext);

  useEffect(() => {
    if (!userDetails) {
      navigate("/");
    }
  }, [userDetails, navigate]);

  return (
    <>
      <ChatHeader />
      <ChatBody />
    </>
  );
};
export default ChatPage;
