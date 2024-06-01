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
