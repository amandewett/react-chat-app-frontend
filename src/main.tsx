import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider, StyleFunctionProps, createMultiStyleConfigHelpers, extendTheme } from "@chakra-ui/react";
import { inputAnatomy } from "@chakra-ui/anatomy";
import LoaderContextProvider from "./store/context/loaderContextProvider.tsx";
import ChatContextProvider from "./store/context/chatContext.tsx";
import { useEffect } from "react";

const hideLoadingScreen = () => {
  const loadingElement = document.getElementById("loader-container");
  if (loadingElement) {
    loadingElement.style.display = "none";
  }
};
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys);

const chakraTheme = extendTheme({
  colors: {
    amberScheme: {
      50: "#FFF8E1",
      100: "#FFECB3",
      200: "#FFE082",
      300: "#FFD54F",
      400: "#FFCA28",
      500: "#FFC107",
      600: "#FFB300",
      700: "#FFA000",
      800: "#FF8F00",
      900: "#FF6F00",
    },
    primaryColor: "#FFD54F",
    buttonColor: "#ECEFF1",
    hoverColor: "#FFECB3",
    textColor: "#424242",
  },
  components: {
    Input: defineMultiStyleConfig({
      baseStyle: definePartsStyle({}),
    }),
    Button: {
      variants: {
        solid: (props: StyleFunctionProps) => ({
          bg: "buttonColor",
          _hover: {
            bg: "hoverColor",
          },
        }),
      },
    },
  },
});

const Main = () => {
  useEffect(() => {
    hideLoadingScreen();
  }, []);

  return (
    <ChatContextProvider>
      <LoaderContextProvider>
        <ChakraProvider theme={chakraTheme}>
          <App />
        </ChakraProvider>
      </LoaderContextProvider>
    </ChatContextProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
