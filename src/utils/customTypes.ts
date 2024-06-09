import { ReactNode } from "react";
import { Socket } from "socket.io-client";

/* API response types */
export type LoginProps = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  profilePicture: string;
  token: string;
};

export type UserProps = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  profilePicture?: string;
};

export type ChatProps = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  chatName?: string;
  isGroupChat: boolean;
  groupAdminID?: string;
  participantIDs?: string[];
  latestMessageId?: string;
  messageIDs?: any[];
  participants: UserProps[];
  latestMessage?: LatestMessageProps;
};

export type LatestMessageProps = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  senderId: string;
  chatId: string;
  message: string;
  sender: UserProps;
};

export type MessageResponseProps = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  senderId: string;
  chatId: string;
  message: string;
  chat: MessageChatProps;
  sender: UserProps;
};

export type MessageChatProps = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  chatName?: string;
  isGroupChat: boolean;
  groupAdminID?: string;
  participantIDs: string[];
  latestMessageId: string;
  messageIDs: any[];
};
/* API response types */

/* components props */
export type DefaultComponentProps = {
  children?: ReactNode;
};

export type MyInputProps = DefaultComponentProps & {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  isFormLabelVisible?: boolean;
  formLabelText?: string;
  isRequired?: boolean;
  hasRightElement?: boolean;
};

export type SignupComponentProps = DefaultComponentProps & {
  handleTabChange: (index: number) => void;
};

export type SearchDrawerProps = DefaultComponentProps & {
  isOpen: boolean;
  onClose: () => void;
};

export type UserListItemProps = DefaultComponentProps & {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  handleOnClick: (id: string) => void;
  chatId?: string;
  isForChatList?: boolean;
  latestMessage?: string;
  latestMessageSenderName?: string;
};

export type CreateGroupModalProps = DefaultComponentProps & {
  isOpen: boolean;
  onClose: () => void;
  chatId?: string;
  isCreating?: boolean;
  groupName?: string;
  groupParticipants?: UserProps[];
  groupAdminId?: string;
};

export type MyTagProps = DefaultComponentProps & {
  profilePicture?: string;
  userName?: string;
  handleDelete: (id: string) => void;
  userId: string;
  groupAdminId?: string;
  isCreating?: boolean;
};

export type AppDrawerContainerProps = DefaultComponentProps & {
  isOpen: boolean;
  onClose: () => void;
};

export type AppModalContainerProps = DefaultComponentProps & {
  isOpen: boolean;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
};

export type UserProfileModalProps = DefaultComponentProps & {
  userName?: string;
  userEmail?: string;
  userProfilePicture?: string;
};

export type MessageBubbleProps = DefaultComponentProps & {
  messages: MessageResponseProps[];
  index: number;
  currentMessage: MessageResponseProps;
  myRef: (el: HTMLDivElement) => HTMLDivElement;
};

type SocketProps = {
  socket: Socket;
};

export type MessengerBodyProps = SocketProps;

export type MessengerFooterProps = SocketProps;

export type UserChatListProps = SocketProps;

export type AppMenuListItemProps = DefaultComponentProps & {
  onClick: () => void;
  title?: string;
};
/* components props */
