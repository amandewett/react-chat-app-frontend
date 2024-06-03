import { createContext, useReducer } from "react";
import { DefaultReactComponentType, SelectedChatType } from "../../utils/customTypes";

export type ChatContextType = {
  userDetails: any | undefined;
  setUserDetails: (data: any) => void;
  setSelectedChat: (chat: any) => void;
  selectedChat: SelectedChatType | undefined;
  setChats: (chats: any) => void;
  chats: SelectedChatType[] | [];
};

export type ReducerActionType = {
  type: string;
  payload?: any;
};

export const ChatContext = createContext<ChatContextType>({
  userDetails: undefined,
  setUserDetails: () => {},
  setSelectedChat: () => {},
  selectedChat: undefined,
  setChats: () => {},
  chats: [],
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

  return state;
};

const userReducerInitialArguments = {
  userDetails: undefined,
  setUserDetails: () => {},
  setSelectedChat: () => {},
  selectedChat: undefined,
  setChats: () => {},
  chats: [],
};

const chatContextProvider = ({ children }: DefaultReactComponentType) => {
  const [userState, userDispatch] = useReducer(userReducer, userReducerInitialArguments);

  const setUserDetails = (userData: any) => {
    userDispatch({
      type: "SET_USER_DETAILS",
      payload: userData,
    });
  };

  const handleSetSelectedChat = (chat: SelectedChatType) => {
    userDispatch({
      type: "SET_SELECTED_CHAT",
      payload: chat,
    });
  };

  const handleSetChats = (chats: SelectedChatType) => {
    userDispatch({
      type: "SET_CHATS",
      payload: chats,
    });
  };

  const defaultValue = {
    userDetails: userState.userDetails,
    setUserDetails: setUserDetails,
    setSelectedChat: handleSetSelectedChat,
    selectedChat: userState.selectedChat,
    setChats: handleSetChats,
    chats: userState.chats,
  };
  return <ChatContext.Provider value={defaultValue}>{children}</ChatContext.Provider>;
};
export default chatContextProvider;
