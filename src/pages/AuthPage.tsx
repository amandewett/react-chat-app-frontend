import { Container } from "@chakra-ui/react";
import AuthHeader from "../components/auth/AuthHeader";
import AuthBody from "../components/auth/AuthBody";

const AuthPage = () => {
  return (
    <Container centerContent maxWidth={"xl"}>
      <AuthHeader />
      <AuthBody />
    </Container>
  );
};
export default AuthPage;
