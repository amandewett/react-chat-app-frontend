import { createContext, useReducer } from "react";
import { ChatProps, DefaultComponentProps, LoginProps, MessageResponseProps } from "../../utils/customTypes";

export type AppContextType = {
  userDetails: LoginProps | undefined;
  setUserDetails: (data: LoginProps | undefined) => void;
  selectedChat: ChatProps | undefined;
  setSelectedChat: (chat: ChatProps | undefined) => void;
  chats: ChatProps[] | undefined;
  setChats: (chats: ChatProps[] | undefined) => void;
  messages: MessageResponseProps[];
  setMessages: (messages: MessageResponseProps[], isNewMessage?: boolean, isFetchingMore?: boolean) => void;
  newMessagesCount: number;
  notifications: MessageResponseProps[];
  setNotification: (message: MessageResponseProps[]) => void;
  isSocketConnected: boolean;
  setIsSocketConnected: (v: boolean) => void;
};

export type ReducerActionType = {
  type: string;
  payload?: any;
};

export const AppContext = createContext<AppContextType>({
  userDetails: undefined,
  setUserDetails: () => {},
  selectedChat: undefined,
  setSelectedChat: () => {},
  chats: [],
  setChats: () => {},
  messages: [],
  setMessages: () => {},
  newMessagesCount: 0,
  notifications: [],
  setNotification: () => {},
  isSocketConnected: false,
  setIsSocketConnected: () => {},
});

const appReducer = (state: AppContextType, action: ReducerActionType) => {
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
      messages: [],
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

  if (action.type === "SET_NOTIFICATION") {
    return {
      ...state,
      notifications: action.payload,
    };
  }

  if (action.type === "SOCKET") {
    return {
      ...state,
      isSocketConnected: action.payload,
    };
  }

  return state;
};

const appReducerInitialArguments = {
  userDetails: undefined,
  setUserDetails: () => {},
  selectedChat: undefined,
  setSelectedChat: () => {},
  chats: [],
  setChats: () => {},
  messages: [],
  setMessages: () => {},
  newMessagesCount: 0,
  notifications: [],
  setNotification: () => {},
  isSocketConnected: false,
  setIsSocketConnected: () => {},
};

const appContextProvider = ({ children }: DefaultComponentProps) => {
  const [appState, appDispatch] = useReducer(appReducer, appReducerInitialArguments);

  const setUserDetails = (userData: LoginProps | undefined) => {
    appDispatch({
      type: "SET_USER_DETAILS",
      payload: userData,
    });
  };

  const handleSetSelectedChat = (chat: ChatProps | undefined) => {
    appDispatch({
      type: "SET_SELECTED_CHAT",
      payload: chat,
    });
  };

  const handleSetChats = (chats: ChatProps[] | undefined) => {
    appDispatch({
      type: "SET_CHATS",
      payload: chats,
    });
  };

  const handleSetMessages = (messages: MessageResponseProps[], isNewMessage = false, isFetchingMore = false) => {
    appDispatch({
      type: "SET_MESSAGES",
      payload: {
        messages: messages,
        isNewMessage: isNewMessage,
        isFetchingMore: isFetchingMore,
      },
    });
  };

  const handleNotifications = (message: MessageResponseProps[]) => {
    appDispatch({
      type: "SET_NOTIFICATION",
      payload: message,
    });
  };

  const handleSocket = (v: boolean) => {
    appDispatch({
      type: "SOCKET",
      payload: v,
    });
  };

  const defaultValue = {
    userDetails: appState.userDetails,
    setUserDetails: setUserDetails,
    selectedChat: appState.selectedChat,
    setSelectedChat: handleSetSelectedChat,
    chats: appState.chats,
    setChats: handleSetChats,
    messages: appState.messages,
    setMessages: handleSetMessages,
    newMessagesCount: appState.newMessagesCount,
    notifications: appState.notifications,
    setNotification: handleNotifications,
    isSocketConnected: appState.isSocketConnected,
    setIsSocketConnected: handleSocket,
  };
  return <AppContext.Provider value={defaultValue}>{children}</AppContext.Provider>;
};
export default appContextProvider;
