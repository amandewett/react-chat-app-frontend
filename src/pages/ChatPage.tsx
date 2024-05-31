import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../store/context/chatContext";

const ChatPage = () => {
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useContext(ChatContext);

  useEffect(() => {
    if (!userDetails) {
      navigate("/");
    }
  }, [userDetails]);

  const logout = () => {
    localStorage.removeItem("user");
    setUserDetails(undefined);
  };

  return (
    <>
      <div>{JSON.stringify(userDetails)}</div>
      <button onClick={logout}>Logout</button>
    </>
  );
};
export default ChatPage;
