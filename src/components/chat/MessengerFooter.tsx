import { Box, Button, Textarea } from "@chakra-ui/react";
import React from "react";

const MessengerFooter = () => {
  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleMessageSubmit} autoComplete="off" noValidate className="h-full">
      <Box bgColor={"transparent"} h={"100%"} w={"100%"} roundedBottomLeft={"15px"} roundedBottomRight={"15px"} display={"flex"} alignItems={"end"}>
        <Textarea rows={1} h={"100%"} resize={"none"} placeholder="Type..." _focusVisible={{ borderColor: "primaryColor", borderWidth: "2px" }} bgColor={"white"} />
        <Button
          ml={2}
          h={"100%"}
          w={"10%"}
          bgColor={"primaryColor"}
          type="submit"
          onClick={() => {
            handleMessageSubmit;
          }}
        >
          Send
        </Button>
      </Box>
    </form>
  );
};
export default MessengerFooter;
