import { Box, Tabs, TabList, Tab, TabPanel, TabPanels } from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";

const AuthBody = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      p={3}
      bg="white"
      w="100%"
      m="15px 0 15px 0"
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <Tabs variant="soft-rounded" colorScheme="blue" width="100%">
        <TabList mb={"1em"} width="100%">
          <Tab width="50%">Login</Tab>
          <Tab width="50%">Sign up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <Signup />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default AuthBody;
