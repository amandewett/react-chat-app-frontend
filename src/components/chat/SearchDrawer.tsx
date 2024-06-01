import { DrawerHeader, DrawerBody, Box, Input, Button, Stack, Skeleton, Text } from "@chakra-ui/react";
import { SearchDrawerProps } from "../../utils/customTypes";
import MyDrawer from "../MyDrawer";
import { useContext, useState } from "react";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ChatContext } from "../../store/context/chatContext";

const SearchDrawer = ({ isOpen, onClose }: SearchDrawerProps) => {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const { userDetails, setUserDetails } = useContext(ChatContext);
  const toast = useCustomToast();
  const { mutate: searchMutate, isPending } = useMutation({
    mutationFn: (queryParams: any) =>
      axios.get(`api/user/all`, {
        params: queryParams,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetails.token}`,
        },
      }),
    onSettled: () => {},
    onError(error: any) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
      });
      if (error.response.status === 401) {
        logout();
      }
    },
    onSuccess(data: any) {
      setUsers(data.data.result);
    },
  });

  const logout = () => {
    localStorage.removeItem("user");
    setUserDetails(undefined);
  };

  const handleSearch = () => {
    if (!search) {
      toast({
        title: "Please enter something to search",
        position: "top-left",
        status: "warning",
      });
      return;
    }
    searchMutate({ search });
  };

  return (
    <MyDrawer isOpen={isOpen} onClose={onClose}>
      <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
      <DrawerBody>
        <Box display={"flex"} pb={2}>
          <Input placeholder="Search Users" mr={2} value={search} onChange={(e) => setSearch(e.target.value)} />
          <Button onClick={handleSearch}>Go</Button>
        </Box>
        {isPending && (
          <Stack>
            <Skeleton height="40px" />
            <Skeleton height="40px" />
            <Skeleton height="40px" />
            <Skeleton height="40px" />
            <Skeleton height="40px" />
            <Skeleton height="40px" />
            <Skeleton height="40px" />
            <Skeleton height="40px" />
            <Skeleton height="40px" />
            <Skeleton height="40px" />
          </Stack>
        )}
        {!isPending && (
          <Stack>
            {users.length !== 0 ? (
              users.map((user: any) => {
                return <p>{user.name}</p>;
              })
            ) : (
              <Text>No users found</Text>
            )}
          </Stack>
        )}
      </DrawerBody>
    </MyDrawer>
  );
};
export default SearchDrawer;
