import { Box } from "@chakra-ui/react";
import MessengerBody from "./MessengerBody";
import MessengerFooter from "./MessengerFooter";
import MessengerHeader from "./MessengerHeader";

const Messenger = () => {
  return (
    <Box h={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
      <Box h={{ sm: "15%", "2xl": "10%" }}>
        <MessengerHeader />
      </Box>
      <Box h={{ sm: "75%", "2xl": "80%" }} bgColor={"buttonColor"} backgroundColor={"transparent"}>
        <MessengerBody />
      </Box>
      <Box h={{ sm: "15%", "2xl": "10%" }} bgColor={"transparent"}>
        <MessengerFooter />
      </Box>
    </Box>
  );
};
export default Messenger;
