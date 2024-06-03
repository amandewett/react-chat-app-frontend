import { useState } from "react";
import { CreateGroupChatModalType } from "../../utils/customTypes";
import MyModalContainer from "../MyModalContainer";
import { Text, Box, Input, Divider, VStack, FormControl, Button } from "@chakra-ui/react";

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
        <FormControl>
          <Input
            value={chatGroupName}
            onChange={(e) => {
              setChatGroupName(e.target.value);
            }}
            type="text"
            placeholder="Group name"
          />
        </FormControl>
        <FormControl colorScheme="amberScheme">
          <Input
            value={search}
            onChange={(e) => {
              handleSearchInputOnChange(e);
            }}
            type="text"
            placeholder="Search users"
          />
        </FormControl>
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
