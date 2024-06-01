import { DrawerHeader, DrawerBody, Box, Input, Button, Stack, Skeleton, Text } from "@chakra-ui/react";
import { SearchDrawerProps } from "../../utils/customTypes";
import MyDrawer from "../MyDrawer";
import { useContext, useState } from "react";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ChatContext } from "../../store/context/chatContext";
import UserListItem from "./UserListItem";
import IosSpinner from "../IosSpinner";

const SearchDrawer = ({ isOpen, onClose }: SearchDrawerProps) => {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const { userDetails, setUserDetails, setSelectedChat } = useContext(ChatContext);
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

  const { mutate: mutateCreateChat, isPending: createChatIsPending } = useMutation({
    mutationFn: (body: any) =>
      axios.post(`api/chat/create`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetails.token}`,
        },
      }),
    onSettled: () => {
      restSearchForm();
      onClose();
    },
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
      setSelectedChat(data.data.result);
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

  function onSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSearch();
  }

  const handleItemOnClick = (id: string) => {
    mutateCreateChat({ receiverId: id });
  };

  const restSearchForm = () => {
    setSearch("");
    setUsers([]);
  };

  return (
    <MyDrawer isOpen={isOpen} onClose={onClose}>
      <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
      <DrawerBody>
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSearchSubmit(e)}>
          <Box display={"flex"} pb={2}>
            <Input placeholder="Search Users" mr={2} value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button onClick={handleSearch} type="submit">
              Go
            </Button>
          </Box>
        </form>
        {isPending && (
          <Stack>
            <Skeleton height="30px" />
            <Skeleton height="20px" width={"70%"} />
            <Skeleton height="30px" />
            <Skeleton height="20px" width={"70%"} />
            <Skeleton height="30px" />
            <Skeleton height="20px" width={"70%"} />
            <Skeleton height="30px" />
            <Skeleton height="20px" width={"70%"} />
            <Skeleton height="30px" />
            <Skeleton height="20px" width={"70%"} />
          </Stack>
        )}
        {!isPending && (
          <Stack>
            {users.length !== 0 ? (
              users.map((user: any) => {
                return <UserListItem key={user.id} id={user.id} name={user.name} email={user.email} profilePicture={user.profilePicture} handleOnClick={handleItemOnClick} />;
              })
            ) : (
              <Text>No users found</Text>
            )}
          </Stack>
        )}
        {createChatIsPending && (
          <div className="items-center justify-center flex mt-10">
            <IosSpinner />
          </div>
        )}
      </DrawerBody>
    </MyDrawer>
  );
};
export default SearchDrawer;
