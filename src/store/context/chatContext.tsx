import { createContext, useReducer, useState } from "react";
import { DefaultReactComponentType, SelectedChatType } from "../../utils/customTypes";

export type ChatContextType = {
  userDetails: any | undefined;
  setUserDetails: (data: any) => void;
  setSelectedChat: (chat: any) => void;
  selectedChat: SelectedChatType | undefined;
};

export type ReducerActionType = {
  type: string;
  payload?: any;
};

export const ChatContext = createContext<ChatContextType>({
  userDetails: undefined,
  setUserDetails: () => {},
  setSelectedChat: (chat: any) => {},
  selectedChat: undefined,
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
  return state;
};

const userReducerInitialArguments = {
  userDetails: undefined,
  setUserDetails: () => {},
  setSelectedChat: (chat: any) => {},
  selectedChat: undefined,
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

  const defaultValue = {
    userDetails: userState.userDetails,
    setUserDetails: setUserDetails,
    setSelectedChat: handleSetSelectedChat,
    selectedChat: userState.selectedChat,
  };
  return <ChatContext.Provider value={defaultValue}>{children}</ChatContext.Provider>;
};
export default chatContextProvider;
