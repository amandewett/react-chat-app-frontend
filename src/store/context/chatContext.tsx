import { createContext, useReducer } from "react";
import { DefaultReactComponentType } from "../../utils/customTypes";

export type ChatContextType = {
  userDetails: any | undefined;
  setUserDetails: (data: any) => void;
};

export type ReducerActionType = {
  type: string;
  payload?: any;
};

export const ChatContext = createContext<ChatContextType>({
  userDetails: undefined,
  setUserDetails: () => {},
});

const userReducer = (state: ChatContextType, action: ReducerActionType) => {
  if (action.type === "SET_USER_DETAILS") {
    return {
      ...state,
      userDetails: action.payload,
    };
  }
  return state;
};

const userReducerInitialArguments = {
  userDetails: undefined,
  setUserDetails: () => {},
};

const chatContextProvider = ({ children }: DefaultReactComponentType) => {
  const [userState, userDispatch] = useReducer(userReducer, userReducerInitialArguments);

  const setUserDetails = (userData: any) => {
    userDispatch({
      type: "SET_USER_DETAILS",
      payload: userData,
    });
  };

  const defaultValue = {
    userDetails: userState.userDetails,
    setUserDetails: setUserDetails,
  };
  return <ChatContext.Provider value={defaultValue}>{children}</ChatContext.Provider>;
};
export default chatContextProvider;
