import { Box, Tabs, TabList, Tab, TabPanel, TabPanels } from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";
import { useState } from "react";

const AuthBody = () => {
  const [selectedTab, setSelectedTab] = useState<number>(1);

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

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
      <Tabs
        variant="soft-rounded"
        colorScheme="blue"
        width="100%"
        index={selectedTab}
      >
        <TabList mb={"1em"} width="100%">
          <Tab width="50%" onClick={() => handleTabChange(0)}>
            Login
          </Tab>
          <Tab width="50%" onClick={() => handleTabChange(1)}>
            Sign up
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <Signup handleTabChange={handleTabChange} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default AuthBody;
