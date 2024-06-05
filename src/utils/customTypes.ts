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

export type AppDrawerContainerProps = DefaultReactComponentType & {
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

export type AppModalContainerType = DefaultReactComponentType & {
  isOpen: boolean;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
};

export type CreateGroupChatModalType = {
  isOpen: boolean;
  onClose: () => void;
  isCreating?: boolean;
  chatId?: string;
  groupName?: string;
  groupParticipants?: UserType[];
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
  h?: string;
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
  id: string;
  handleDelete: (id: string) => void;
};

export type UserProfileModalProps = {
  userName: string;
  userEmail: string;
  userProfilePicture: string;
};
