import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <div className="bg-[url('src/assets/images/bg.jpg')] w-screen h-screen bg-cover bg-center">
        <App />
      </div>
    </ChakraProvider>
  </React.StrictMode>
);
