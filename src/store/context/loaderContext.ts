import { createContext } from "react";

export type LoaderContextType = {
  isLoading: boolean;
  enableLoader: () => void;
  disableLoader: () => void;
};

export const LoaderContext = createContext<LoaderContextType>({
  isLoading: false,
  enableLoader: () => {},
  disableLoader: () => {},
});
