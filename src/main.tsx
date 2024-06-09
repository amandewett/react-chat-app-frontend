import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider, createMultiStyleConfigHelpers, extendTheme } from "@chakra-ui/react";
import { inputAnatomy } from "@chakra-ui/anatomy";
import LoaderContextProvider from "./store/context/loaderContextProvider.tsx";
import AppContextProvider from "./store/context/appContext.tsx";
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
    appBgColor: "#111111",
    appListItemBgColor: "#1a1a1a",
    appPrimaryColor: "#2ec4b6",
    appHoverColor: "#1f8f8a",
    appLightHoverColor: "#49d3c4",
    appTextColor: "#F5FFFA",
    appGrayColor: "#78909C",
  },
  components: {
    Input: defineMultiStyleConfig({
      baseStyle: definePartsStyle({}),
    }),
    Button: {
      variants: {
        solid: () => ({
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
    <AppContextProvider>
      <LoaderContextProvider>
        <ChakraProvider theme={chakraTheme}>
          <App />
        </ChakraProvider>
      </LoaderContextProvider>
    </AppContextProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
