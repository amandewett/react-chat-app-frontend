import { DrawerHeader, DrawerBody, Box, Input, Button } from "@chakra-ui/react";
import { SearchDrawerProps } from "../../utils/customTypes";
import MyDrawer from "../MyDrawer";
import { useState } from "react";
import { useCustomToast } from "../../hooks/useCustomToast";

const SearchDrawer = ({ isOpen, onClose }: SearchDrawerProps) => {
  const [search, setSearch] = useState<string>("");
  const toast = useCustomToast();

  const handleSearch = () => {
    if (!search) {
      toast({
        title: "Please enter something to search",
        position: "top-left",
        status: "warning",
      });
    }
  };

  return (
    <MyDrawer isOpen={isOpen} onClose={onClose}>
      <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
      <DrawerBody>
        <Box display={"flex"} pb={2}>
          <Input placeholder="Search Users" mr={2} value={search} onChange={(e) => setSearch(e.target.value)} />
          <Button onClick={handleSearch}>Go</Button>
        </Box>
      </DrawerBody>
    </MyDrawer>
  );
};
export default SearchDrawer;
