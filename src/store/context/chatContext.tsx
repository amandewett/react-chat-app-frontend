import { createContext, useReducer, useRef } from "react";
import { ChatProps, DefaultComponentProps, LoginProps, MessageResponseProps } from "../../utils/customTypes";

export type ChatContextType = {
  userDetails: LoginProps | undefined;
  setUserDetails: (data: LoginProps | undefined) => void;
  selectedChat: ChatProps | undefined;
  setSelectedChat: (chat: ChatProps | undefined) => void;
  chats: ChatProps[] | undefined;
  setChats: (chats: ChatProps[] | undefined) => void;
  messages: MessageResponseProps[];
  setMessages: (messages: MessageResponseProps[], isNewMessage?: boolean, isFetchingMore?: boolean) => void;
  newMessagesCount: number;
};

export type ReducerActionType = {
  type: string;
  payload?: any;
};

export const ChatContext = createContext<ChatContextType>({
  userDetails: undefined,
  setUserDetails: () => {},
  selectedChat: undefined,
  setSelectedChat: () => {},
  chats: [],
  setChats: () => {},
  messages: [],
  setMessages: () => {},
  newMessagesCount: 0,
});

const userReducer = (state: ChatContextType, action: ReducerActionType) => {
  if (action.type === "SET_USER_DETAILS") {
    return {
      ...state,
      userDetails: action.payload,
    };
  }

  if (action.type === "SET_SELECTED_CHAT") {
    return {
      ...state,
      selectedChat: action.payload,
    };
  }

  if (action.type === "SET_CHATS") {
    return {
      ...state,
      chats: action.payload,
    };
  }

  if (action.type === "SET_MESSAGES") {
    if (action.payload.messages.length === 0) {
      if (action.payload.isFetchingMore) {
        return {
          ...state,
          newMessagesCount: 0,
        };
      } else {
        return {
          ...state,
          messages: [],
          newMessagesCount: 0,
        };
      }
    } else {
      if (action.payload.isNewMessage) {
        return {
          ...state,
          messages: [...state.messages, ...action.payload.messages],
          newMessagesCount: 0,
        };
      } else {
        return {
          ...state,
          messages: [...action.payload.messages, ...state.messages],
          newMessagesCount: action.payload.messages.length,
        };
      }
    }
  }

  return state;
};

const userReducerInitialArguments = {
  userDetails: undefined,
  setUserDetails: () => {},
  selectedChat: undefined,
  setSelectedChat: () => {},
  chats: [],
  setChats: () => {},
  messages: [],
  setMessages: () => {},
  newMessagesCount: 0,
};

const chatContextProvider = ({ children }: DefaultComponentProps) => {
  const [userState, userDispatch] = useReducer(userReducer, userReducerInitialArguments);

  const setUserDetails = (userData: LoginProps | undefined) => {
    userDispatch({
      type: "SET_USER_DETAILS",
      payload: userData,
    });
  };

  const handleSetSelectedChat = (chat: ChatProps | undefined) => {
    userDispatch({
      type: "SET_SELECTED_CHAT",
      payload: chat,
    });
  };

  const handleSetChats = (chats: ChatProps[] | undefined) => {
    userDispatch({
      type: "SET_CHATS",
      payload: chats,
    });
  };

  const handleSetMessages = (messages: MessageResponseProps[], isNewMessage = false, isFetchingMore = false) => {
    userDispatch({
      type: "SET_MESSAGES",
      payload: {
        messages: messages,
        isNewMessage: isNewMessage,
        isFetchingMore: isFetchingMore,
      },
    });
  };

  const defaultValue = {
    userDetails: userState.userDetails,
    setUserDetails: setUserDetails,
    selectedChat: userState.selectedChat,
    setSelectedChat: handleSetSelectedChat,
    chats: userState.chats,
    setChats: handleSetChats,
    messages: userState.messages,
    setMessages: handleSetMessages,
    newMessagesCount: userState.newMessagesCount,
  };
  return <ChatContext.Provider value={defaultValue}>{children}</ChatContext.Provider>;
};
export default chatContextProvider;
