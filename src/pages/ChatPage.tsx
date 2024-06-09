import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../store/context/appContext";
import ChatHeader from "../components/chat/header/ChatHeader";
import ChatBody from "../components/chat/ChatBody";

const ChatPage = () => {
  const navigate = useNavigate();
  const { userDetails } = useContext(AppContext);

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
