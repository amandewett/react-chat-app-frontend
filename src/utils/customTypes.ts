import { ReactNode } from "react";

export type DefaultReactComponentType = {
  children?: ReactNode;
};

export type FormType = DefaultReactComponentType & {
  label: string;
  isRequired: boolean;
  placeHolder: string;
  inputType: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
};

export type SignupComponentType = {
  handleTabChange: (index: number) => void;
};

export type MyDrawerProps = DefaultReactComponentType & {
  onClose: () => void;
  isOpen: boolean;
};

export type SearchDrawerProps = {
  onClose: () => void;
  isOpen: boolean;
};

export type UserListItemProps = {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  handleOnClick: (id: string) => void;
  chatId?: string;
};

export type SelectedChatType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  chatName: null;
  isGroupChat: boolean;
  groupAdminID: null;
  participantIDs: string[];
  messageIDs: any[];
  latestMessageId: null;
  participants: Participant[];
};

export type Participant = {
  name: string;
  email: string;
  id: string;
  profilePicture: string;
};

export type ChatListItemType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  chatName: null;
  isGroupChat: boolean;
  groupAdminID: null;
  participantIDs: string[];
  messageIDs: any[];
  latestMessageId: null;
  participants: Participant[];
};

export type ProfileModalType = {
  isOpen: boolean;
  onClose: () => void;
  isForOtherUser?: boolean;
  userName?: string;
  userEmail?: string;
  profilePicture?: string;
};

export type MyModalContainerType = DefaultReactComponentType & {
  modalHeader: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export type CreateGroupChatModalType = {
  isOpen: boolean;
  isCreating?: boolean;
  onClose: () => void;
  groupName?: string;
};

export type MyInputType = DefaultReactComponentType & {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeHolder?: string;
  isFormLabelVisible?: boolean;
  formLabelText?: string;
  isRequired?: boolean;
  hasRightElement?: boolean;
};

export type UseDebounceHookType = {
  value: any;
  delay?: number;
};

export type UserType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  profilePicture: string;
  chatIDs: any[];
  participantChats: any[];
};

export type MyTagType = {
  profilePicture: string;
  userName: string;
};
