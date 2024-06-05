import { useContext, useEffect, useState } from "react";
import { CreateGroupChatModalType, UserType } from "../../utils/customTypes";
import { Text, Box, VStack, Button, Wrap, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
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
import AppModalContainer from "../modals/AppModalContainer";

const CreateGroupChatModal = ({ isOpen, onClose, chatId, isCreating = false, groupName = "", groupParticipants = [] }: CreateGroupChatModalType) => {
  const [chatGroupName, setChatGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const [userSearchList, setUserSearchList] = useState<UserType[]>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [participantToRemove, setParticipantToRemove] = useState<string>("");
  const debouncedSearch = useDebounce(searchInputValue.trim());
  const toast = useCustomToast();
  const { enableLoader, disableLoader } = useContext(LoaderContext);
  const { setChats, userDetails, setSelectedChat } = useContext(ChatContext);

  let { mutate: mutateSearchUsers, isPending } = useMutation({
    mutationFn: (queryParams: any) =>
      axiosInstance.get(`api/user/all`, {
        params: queryParams,
      }),
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
    onSettled() {
      mutateAllChats();
    },
    onError(error: any) {
      toast({
        title: error.response.data.message,
        status: "error",
      });
    },
    onSuccess: () => {
      resetForm();
      onClose();
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

  const { mutate: mutateRemoveParticipant, isPending: isPendingRemoveParticipant } = useMutation({
    mutationFn: (body: any) => axiosInstance.put(`api/chat/group/removeUser`, body),
    onSettled: () => {},
    onError(error: any) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
      });
    },
    onSuccess() {
      setSelectedUsers((prev: UserType[]) => prev.filter((u: UserType) => u.id !== participantToRemove));
      mutateAllChats();
    },
  });

  const { mutate: mutateAddParticipant, isPending: isPendingAddParticipant } = useMutation({
    mutationFn: (body: any) => axiosInstance.put(`api/chat/group/addUser`, body),
    onSettled: () => {},
    onError(error: any) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
      });
    },
    onSuccess() {
      mutateAllChats();
    },
  });

  const { mutate: mutateDeleteGroup } = useMutation({
    mutationFn: () => axiosInstance.delete(`api/chat/group/delete/${chatId}`),
    onSettled: () => {},
    onMutate() {
      enableLoader();
    },
    onError(error: any) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
      });
    },
    onSuccess() {
      onClose();
      setSelectedChat(undefined);
      mutateAllChats();
    },
  });

  const { mutate: mutateRenameGroup } = useMutation({
    mutationFn: (body: any) => axiosInstance.put(`api/chat/group/rename`, body),
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
    onSuccess() {
      setSearchInputValue("");
      setUserSearchList([]);
      onClose();
      toast({
        title: `Group updated successfully`,
        status: "success",
      });
    },
  });

  useEffect(() => {
    if (debouncedSearch !== "") {
      mutateSearchUsers({ search: debouncedSearch });
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (!isCreating) {
      setChatGroupName(groupName);
      setSelectedUsers(groupParticipants);
    }
  }, [chatId]);

  const handleSearchInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
    if (e.target.value === "") {
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

    if (selectedUsers.length < 2) {
      toast({
        title: "Group participants must be at least 2",
        status: "error",
      });
      return;
    }

    enableLoader();
    if (isCreating) {
      mutateCreateGroup({ groupName: chatGroupName, groupParticipants: selectedUsers.map((selectedUser) => selectedUser.id) });
    } else {
      //mutate group rename API
      mutateRenameGroup({ groupId: chatId, groupName: chatGroupName });
    }
    return;
  };

  const handleUserOnClick = (user: UserType) => {
    if (selectedUsers.findIndex((userItem: UserType) => userItem.id === user.id) === -1) {
      setSelectedUsers((prev: UserType[]) => [...prev, user]);
      if (!isCreating) {
        mutateAddParticipant({ groupId: chatId, users: user?.id });
      }
    } else {
      toast({
        title: "User already a participant",
        status: "warning",
      });
    }
  };

  const resetForm = () => {
    setSearchInputValue("");
    setChatGroupName("");
    setUserSearchList([]);
    setSelectedUsers([]);
  };

  const handleTagDelete = (id: string) => {
    if (selectedUsers.length > 2) {
      setParticipantToRemove(id);
      mutateRemoveParticipant({ groupId: chatId, userId: id });
    } else {
      toast({
        title: "Group must have at least 2 numbers",
        status: "warning",
      });
    }
  };

  const onGroupModalCanceled = () => {
    if (isCreating) resetForm();
    setSearchInputValue("");
    setUserSearchList([]);
    onClose();
  };

  return (
    <AppModalContainer isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <form onSubmit={handleOnFormSubmit} autoComplete="off" noValidate>
        <ModalHeader>
          <Text>{isCreating ? "Create new group" : "Update group"}</Text>
          <ModalCloseButton onClick={onGroupModalCanceled} />
        </ModalHeader>
        <ModalBody>
          <VStack spacing={5}>
            <MyInput value={chatGroupName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChatGroupName(e.target.value)} placeHolder="Group name" />
            <MyInput isRequired={true} value={searchInputValue} onChange={handleSearchInputOnChange} placeHolder="Search users" />
            {/* selected users */}
            <Wrap display={"flex"} w={"100%"}>
              {selectedUsers.length !== 0 &&
                selectedUsers.map((user: UserType) => <MyTag id={user.id} handleDelete={handleTagDelete} profilePicture={user.profilePicture} userName={user.name} key={user.id} />)}
            </Wrap>
            {/* render search users list */}
            {isPending && <IosSpinner />}
            {isPendingRemoveParticipant && <IosSpinner />}
            {isPendingAddParticipant && <IosSpinner />}
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
            <ModalFooter display={"flex"} justifyContent={"end"} w={"100%"} p={0} mb={2}>
              {!isCreating && userDetails?.id === selectedUsers[0]?.id && (
                <Button
                  borderColor={"#C62828"}
                  variant={"outline"}
                  type="button"
                  _hover={{ bgColor: "#C62828", textColor: "white" }}
                  onClick={() => {
                    mutateDeleteGroup();
                  }}
                  mr={4}
                >
                  Delete group
                </Button>
              )}

              <Button
                bgColor={"primaryColor"}
                type="submit"
                onClick={() => {
                  handleOnFormSubmit;
                }}
              >
                {isCreating ? "Create" : "Update"}
              </Button>
            </ModalFooter>
          </VStack>
        </ModalBody>
      </form>
    </AppModalContainer>
  );
};
export default CreateGroupChatModal;
