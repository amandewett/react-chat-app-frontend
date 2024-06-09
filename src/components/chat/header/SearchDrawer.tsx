import { DrawerHeader, DrawerBody, Box, Button, Stack, Skeleton, Text } from "@chakra-ui/react";
import { SearchDrawerProps, UserProps } from "../../../utils/customTypes";
import AppDrawerContainer from "../../modals/AppDrawerContainer";
import { useContext, useEffect, useState } from "react";
import { useCustomToast } from "../../../hooks/useCustomToast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AppContext } from "../../../store/context/appContext";
import UserListItem from "../UserListItem";
import IosSpinner from "../../IosSpinner";
import axiosInstance from "../../../utils/axiosInstance";
import MyInput from "../../MyInputs/MyInput";

const SearchDrawer = ({ isOpen, onClose }: SearchDrawerProps) => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<UserProps[]>([]);
  const { userDetails, setSelectedChat, setChats } = useContext(AppContext);
  const toast = useCustomToast();

  const { data: usersList } = useQuery({
    queryKey: ["usersList"],
    queryFn: ({ signal }) => axiosInstance.get(`api/user/all`, { signal: signal }),
  });

  useEffect(() => {
    if (usersList && usersList.data.result.length != 0) {
      setUsers(usersList?.data.result);
    }
  }, [usersList]);

  const { mutate: mutateUserSearch, isPending: isPendingUserSearch } = useMutation({
    mutationFn: (queryParams: any) =>
      axiosInstance.get(`api/user/all`, {
        params: queryParams,
      }),
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

  const { mutate: mutateCreateChat, isPending: isPendingCreateChat } = useMutation({
    mutationFn: (body: any) =>
      axiosInstance.post(`api/chat/create`, body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userDetails?.token}`,
        },
      }),
    onSettled: () => {
      mutateAllChats();
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

  const { mutate: mutateAllChats, isPending: isPendingAllChats } = useMutation({
    mutationFn: () => axiosInstance.get(`api/chat/all`),
    onSettled: () => {
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
      setChats(data.data.result);
    },
  });

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutateUserSearch({ search });
  }

  const handleItemOnClick = (id: string) => {
    mutateCreateChat({ receiverId: id });
  };

  return (
    <AppDrawerContainer isOpen={isOpen} onClose={onClose}>
      <DrawerHeader borderBottomWidth={2} borderColor={"appPrimaryColor"}>
        <form onSubmit={handleSearchSubmit}>
          <Box display={"flex"} pb={2}>
            <MyInput placeholder="Search Users" value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button
              type="submit"
              bgColor="appPrimaryColor"
              textColor="appBgColor"
              onClick={() => {
                handleSearchSubmit;
              }}
              ml={2}
            >
              Go
            </Button>
          </Box>
        </form>
      </DrawerHeader>
      <DrawerBody>
        {isPendingUserSearch && (
          <Stack>
            <Skeleton height="30px" bgColor={"appGrayColor"} />
            <Skeleton height="20px" width={"70%"} bgColor={"appGrayColor"} />
            <Skeleton height="30px" bgColor={"appGrayColor"} />
            <Skeleton height="20px" width={"70%"} bgColor={"appGrayColor"} />
            <Skeleton height="30px" bgColor={"appGrayColor"} />
            <Skeleton height="20px" width={"70%"} bgColor={"appGrayColor"} />
            <Skeleton height="30px" bgColor={"appGrayColor"} />
            <Skeleton height="20px" width={"70%"} bgColor={"appGrayColor"} />
            <Skeleton height="30px" bgColor={"appGrayColor"} />
            <Skeleton height="20px" width={"70%"} bgColor={"appGrayColor"} />
            <Skeleton height="30px" bgColor={"appGrayColor"} />
            <Skeleton height="20px" width={"70%"} bgColor={"appGrayColor"} />
            <Skeleton height="30px" bgColor={"appGrayColor"} />
            <Skeleton height="20px" width={"70%"} bgColor={"appGrayColor"} />
          </Stack>
        )}
        {!isPendingUserSearch && (
          <Stack>
            {users.length !== 0 ? (
              users.map((user: UserProps) => {
                return <UserListItem key={user?.id} id={user?.id} name={user?.name} email={user?.email} profilePicture={user?.profilePicture} handleOnClick={handleItemOnClick} />;
              })
            ) : (
              <Text textColor={"appGrayColor"} textAlign={"center"}>
                No users found
              </Text>
            )}
          </Stack>
        )}
        {isPendingCreateChat || (isPendingAllChats && <IosSpinner />)}
      </DrawerBody>
    </AppDrawerContainer>
  );
};
export default SearchDrawer;
