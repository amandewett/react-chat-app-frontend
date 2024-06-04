import { useContext, useEffect, useState } from "react";
import { CreateGroupChatModalType, UserType } from "../../utils/customTypes";
import MyModalContainer from "../MyModalContainer";
import { Text, Box, VStack, Button, Wrap } from "@chakra-ui/react";
import MyInput from "../MyInputs/MyInput";
import { useCustomToast } from "../../hooks/useCustomToast";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { useDebounce } from "../../hooks/useDebounce";
import IosSpinner from "../IosSpinner";
import UserListItem from "./UserListItem";
import MyTag from "./MyTag";
import { LoaderContext } from "../../store/context/loaderContext";
import { ChatContext } from "../../store/context/chatContext";

const CreateGroupChatModal = ({ isOpen, onClose, groupName = "", isCreating = false }: CreateGroupChatModalType) => {
  const [chatGroupName, setChatGroupName] = useState(groupName);
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const [userSearchList, setUserSearchList] = useState<UserType[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search.trim());
  const toast = useCustomToast();
  const { enableLoader, disableLoader, isLoading } = useContext(LoaderContext);
  const { setChats } = useContext(ChatContext);

  let { mutate: mutateSearchUsers, isPending } = useMutation({
    mutationFn: (queryParams: any) =>
      axiosInstance.get(`api/user/all`, {
        params: queryParams,
      }),
    onSettled: () => {},
    onError(error: any) {
      toast({
        title: error.response.data.message,
        status: "error",
      });
    },
    onSuccess: (data: any) => {
      setUserSearchList(data.data.result);
    },
  });

  let { mutate: mutateCreateGroup } = useMutation({
    mutationFn: (body: any) => axiosInstance.post(`api/chat/group/create`, body),
    onSettled: () => {
      resetForm();
      onClose();
      mutateAllChats();
    },
    onError(error: any) {
      toast({
        title: error.response.data.message,
        status: "error",
      });
    },
    onSuccess: (data: any) => {
      toast({
        title: `Group created successfully`,
        status: "success",
      });
    },
  });

  const { mutate: mutateAllChats } = useMutation({
    mutationFn: () => axiosInstance.get(`api/chat/all`),
    onSettled: () => {
      disableLoader();
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

  useEffect(() => {
    if (debouncedSearch !== "") {
      mutateSearchUsers({ search: debouncedSearch });
    }
  }, [debouncedSearch]);

  const handleSearchInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (search === "") {
      setUserSearchList([]);
    }
  };

  const handleOnFormSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (!chatGroupName) {
      toast({
        title: "Group name cannot be empty",
        status: "error",
      });
      return;
    }

    if (selectedUsers.length <= 2) {
      toast({
        title: "Group participants must be more than 2",
        status: "error",
      });
      return;
    }

    enableLoader();
    mutateCreateGroup({ groupName: chatGroupName, groupParticipants: selectedUsers.map((selectedUser) => selectedUser.id) });
    onClose();

    return;
  };

  const handleUserOnClick = (user: UserType) => {
    if (selectedUsers.findIndex((userItem: UserType) => userItem.id === user.id) === -1) {
      setSelectedUsers((prev: UserType[]) => [...prev, user]);
    } else {
      toast({
        title: "User already a participant",
        status: "warning",
      });
    }
  };

  const resetForm = () => {
    setSearch("");
    setChatGroupName("");
    setUserSearchList([]);
  };

  return (
    <MyModalContainer isOpen={isOpen} onClose={onClose} modalHeader={<Text>{isCreating ? "Create Group" : chatGroupName}</Text>}>
      <form onSubmit={handleOnFormSubmit} autoComplete="off" noValidate>
        <VStack spacing={5}>
          <MyInput value={chatGroupName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChatGroupName(e.target.value)} placeHolder="Group name" />
          <MyInput isRequired={true} value={search} onChange={handleSearchInputOnChange} placeHolder="Search users" />
          {/* selected users */}
          <Wrap display={"flex"} w={"100%"}>
            {selectedUsers.length !== 0 && selectedUsers.map((user: UserType) => <MyTag profilePicture={user.profilePicture} userName={user.name} key={user.id} />)}
          </Wrap>
          {/* render search users list */}
          {isPending && <IosSpinner />}
          {!isPending && userSearchList.length !== 0 && (
            <Box maxH={"200px"} overflowY={"auto"} w={"100%"}>
              <VStack w={"100%"}>
                {userSearchList.map((user: UserType) => (
                  <UserListItem
                    key={user.id}
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    handleOnClick={() => {
                      handleUserOnClick(user);
                    }}
                    profilePicture={user.profilePicture}
                  />
                ))}
              </VStack>
            </Box>
          )}
          <Box display={"flex"} justifyContent={"end"} w={"100%"}>
            <Button
              bgColor={"primaryColor"}
              type="submit"
              onClick={() => {
                handleOnFormSubmit;
              }}
            >
              {isCreating ? "Create" : "Update"}
            </Button>
          </Box>
        </VStack>
      </form>
    </MyModalContainer>
  );
};
export default CreateGroupChatModal;
