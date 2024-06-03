import { useState } from "react";
import { CreateGroupChatModalType } from "../../utils/customTypes";
import MyModalContainer from "../MyModalContainer";
import { Text, Box, VStack, Button } from "@chakra-ui/react";
import MyInput from "../MyInputs/MyInput";
import { useCustomToast } from "../../hooks/useCustomToast";

const CreateGroupChatModal = ({ isOpen, onClose, groupName = "", isCreating = false }: CreateGroupChatModalType) => {
  const [chatGroupName, setChatGroupName] = useState(groupName);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const toast = useCustomToast();

  const handleSearchInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
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

    toast({
      title: "Group created successfully",
      status: "success",
    });
    return;
  };

  return (
    <MyModalContainer isOpen={isOpen} onClose={onClose} modalHeader={<Text>{isCreating ? "Create Group" : chatGroupName}</Text>}>
      <form onSubmit={handleOnFormSubmit} autoComplete="off" noValidate>
        <VStack spacing={5}>
          <MyInput value={chatGroupName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChatGroupName(e.target.value)} placeHolder="Group name" />
          <MyInput isRequired={true} value={search} onChange={handleSearchInputOnChange} placeHolder="Search users" />
          {/* selected users */}
          {/* render search users list */}
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
