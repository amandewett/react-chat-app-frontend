import { useReducer } from "react";
import { LoaderContext } from "./loaderContext";

type LoaderReducerActionType = {
  type: string;
};

const loaderReducer = (state: any, action: LoaderReducerActionType) => {
  if (action.type === "enable") {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === "disable") {
    return {
      ...state,
      isLoading: false,
    };
  }

  return state;
};

const LoaderContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [loaderState, loaderDispatcher] = useReducer(loaderReducer, {
    isLoading: false,
  });
  const enableLoader = () => {
    loaderDispatcher({
      type: "enable",
    });
  };

  const disableLoader = () => {
    loaderDispatcher({
      type: "disable",
    });
  };

  const loaderContextDefaultValue = {
    isLoading: loaderState.isLoading,
    enableLoader: enableLoader,
    disableLoader: disableLoader,
  };

  return (
    <LoaderContext.Provider value={loaderContextDefaultValue}>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderContextProvider;
