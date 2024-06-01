import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import LoaderContextProvider from "./store/context/loaderContextProvider.tsx";
import ChatContextProvider from "./store/context/chatContext.tsx";
import { useEffect } from "react";

const hideLoadingScreen = () => {
  const loadingElement = document.getElementById("loader-container");
  if (loadingElement) {
    loadingElement.style.display = "none";
  }
};

const Main = () => {
  useEffect(() => {
    hideLoadingScreen();
  }, []);

  return (
    <ChatContextProvider>
      <LoaderContextProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </LoaderContextProvider>
    </ChatContextProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
