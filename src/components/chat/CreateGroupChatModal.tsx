import { useState } from "react";
import { CreateGroupChatModalType } from "../../utils/customTypes";
import MyModalContainer from "../MyModalContainer";
import { Text, Box, Input, VStack, FormControl, Button } from "@chakra-ui/react";
import MyInput from "../MyInputs/MyInput";

const CreateGroupChatModal = ({ isOpen, onClose, groupName = "", isCreating = false }: CreateGroupChatModalType) => {
  const [chatGroupName, setChatGroupName] = useState(groupName);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearchInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <MyModalContainer isOpen={isOpen} onClose={onClose} modalHeader={<Text>{isCreating ? "Create Group" : chatGroupName}</Text>}>
      <VStack spacing={5}>
        <MyInput value={chatGroupName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChatGroupName(e.target.validationMessage)} placeHolder="Group name" />
        <MyInput value={search} onChange={handleSearchInputOnChange} placeHolder="Search users" />
        {/* selected users */}
        {/* render search users list */}
        <Box display={"flex"} justifyContent={"end"} w={"100%"}>
          <Button bgColor={"primaryColor"}>{isCreating ? "Create" : "Update"}</Button>
        </Box>
      </VStack>
    </MyModalContainer>
  );
};
export default CreateGroupChatModal;
