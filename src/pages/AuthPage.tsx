import { Container } from "@chakra-ui/react";
import AuthHeader from "../components/auth/AuthHeader";
import AuthBody from "../components/auth/AuthBody";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../store/context/chatContext";

const AuthPage = () => {
  const navigate = useNavigate();
  const { userDetails } = useContext(ChatContext);

  useEffect(() => {
    if (userDetails) {
      navigate("/chat");
    }
  }, [userDetails, navigate]);

  return (
    <Container centerContent maxWidth={"xl"}>
      <AuthHeader />
      <AuthBody />
    </Container>
  );
};
export default AuthPage;
