import { Box } from "@chakra-ui/react";
import MessengerBody from "./MessengerBody";
import MessengerFooter from "./MessengerFooter";
import MessengerHeader from "./MessengerHeader";
import { Socket } from "socket.io-client";

const Messenger = ({ socket }: { socket: Socket }) => {
  return (
    <Box h={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"space-between"} rounded="lg" borderWidth={2} borderColor={"appHoverColor"}>
      <Box h={["10%", "10%", "10%", "10%", "15%", "10%"]}>
        <MessengerHeader />
      </Box>
      <Box h={["80%", "80%", "80%", "80%", "70%", "80%"]} bgColor={"buttonColor"} backgroundColor={"transparent"}>
        <MessengerBody socket={socket} />
      </Box>
      <Box h={["10%", "10%", "10%", "10%", "15%", "10%"]}>
        <MessengerFooter socket={socket} />
      </Box>
    </Box>
  );
};
export default Messenger;
