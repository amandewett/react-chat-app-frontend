import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ErrorLayout from "./layouts/ErrorLayout";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";
import { useContext, useEffect } from "react";
import { LoaderContext } from "./store/context/loaderContext";
import Loader from "./components/Loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatContext } from "./store/context/chatContext";
import LoadingBar from "./components/LoadingBar";

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorLayout />,
    children: [
      {
        index: true,
        element: <AuthPage />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
    ],
  },
]);

const App = () => {
  const { isLoading } = useContext(LoaderContext);
  const queryClient = new QueryClient();
  const { setUserDetails } = useContext(ChatContext);

  useEffect(() => {
    const getUser = () => {
      const userData = localStorage.getItem("user");

      if (userData && userData !== "undefined") {
        setUserDetails(JSON.parse(userData));
      } else {
        setUserDetails(undefined);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <div className="relative">
        <div className="fixed bg-[url('../images/bg.jpg')] bg-fixed w-screen h-screen bg-cover bg-no-repeat bg-center brightness-[0.4]" />
        <div className="absolute z-[1] w-full">
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={routerConfig} />
          </QueryClientProvider>
        </div>
        {isLoading && (
          <div className="bg-black bg-opacity-90 w-screen h-screen absolute flex flex-row justify-center items-center z-[2]">
            <section className="flex flex-col items-center">
              <h2 className="text-white text-3xl font-semibold">Chit Chat</h2>
              <LoadingBar />
            </section>
          </div>
        )}
      </div>
    </>
  );
};
export default App;
