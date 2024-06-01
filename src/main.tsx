import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import LoaderContextProvider from "./store/context/loaderContextProvider.tsx";
import ChatContextProvider from "./store/context/chatContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChatContextProvider>
    <LoaderContextProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </LoaderContextProvider>
  </ChatContextProvider>
);
