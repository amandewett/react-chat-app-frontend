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
    appColorScheme: {
      50: "#FFF1F2",
      100: "#FFE4E6",
      200: "#FECDD3",
      300: "#FDA4AF",
      400: "#FB7185",
      500: "#F43F5E",
      600: "#E11D48",
      700: "#BE123C",
      800: "#9F1239",
      900: "#881337",
      950: "#4C0519",
    },
    primaryColor: "#F43F5E",
    buttonColor: "#ECEFF1",
    hoverColor: "#FFE4E6",
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
