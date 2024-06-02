import { DrawerHeader, DrawerBody, Box, Input, Button, Stack, Skeleton, Text } from "@chakra-ui/react";
import { SearchDrawerProps } from "../../utils/customTypes";
import MyDrawer from "../MyDrawer";
import { useContext, useEffect, useState } from "react";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChatContext } from "../../store/context/chatContext";
import UserListItem from "./UserListItem";
import IosSpinner from "../IosSpinner";
import axiosInstance from "../../utils/axiosInstance";

const SearchDrawer = ({ isOpen, onClose }: SearchDrawerProps) => {
  const [search, setSearch] = useState<string>("");
  /* const { data: usersList } = useQuery({
    queryKey: ["search", "dd"],
    queryFn: ({ signal }) => axiosInstance.get(`api/user/all`, { params: { search: "" }, signal: signal }),
  });
  useEffect(() => {
    if (usersList && usersList.data.result.length != 0) {
      setUsers(usersList?.data.result);
    }
  }, [usersList]); */
  const [users, setUsers] = useState<any[]>([]);
  const { userDetails, setSelectedChat } = useContext(ChatContext);
  const toast = useCustomToast();

  const { mutate: searchMutate, isPending } = useMutation({
    mutationFn: (queryParams: any) =>
      axiosInstance.get(`api/user/all`, {
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
    },
    onSuccess(data: any) {
      setUsers(data.data.result);
    },
  });

  const { mutate: mutateCreateChat, isPending: createChatIsPending } = useMutation({
    mutationFn: (body: any) =>
      axiosInstance.post(`api/chat/create`, body, {
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
    },
    onSuccess(data: any) {
      setSelectedChat(data.data.result);
    },
  });

  const handleSearch = () => {
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
    // setSearch("");
  };

  return (
    <MyDrawer isOpen={isOpen} onClose={onClose}>
      <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
      <DrawerBody>
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSearchSubmit(e)}>
          <Box display={"flex"} pb={2}>
            <Input placeholder="Search Users" mr={2} value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button type="submit">Go</Button>
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
