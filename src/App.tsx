import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ErrorLayout from "./layouts/ErrorLayout";
import { useContext, useEffect, useState, Suspense, lazy } from "react";
import { LoaderContext } from "./store/context/loaderContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatContext } from "./store/context/chatContext";
import LoadingBar from "./components/LoadingBar";
import IosSpinner from "./components/IosSpinner";

const AuthPage = lazy(() => import("./pages/AuthPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<IosSpinner />}>
            <AuthPage />,
          </Suspense>
        ),
      },
      {
        path: "chat",
        element: (
          <Suspense fallback={<IosSpinner />}>
            <ChatPage />,
          </Suspense>
        ),
      },
    ],
  },
]);

const App = () => {
  const { isLoading } = useContext(LoaderContext);
  const queryClient = new QueryClient();
  const { setUserDetails } = useContext(ChatContext);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const getUser = () => {
      const userData = localStorage.getItem("user");

      if (userData && userData !== "undefined") {
        setUserDetails(JSON.parse(userData));
      } else {
        setUserDetails(undefined);
      }
      setTimeout(() => {
        setIsPageLoading(false);
      }, 10);
    };
    getUser();
  }, []);

  if (isPageLoading) {
    return <LoadingBar asPageLoader={true} />;
  }

  return (
    <>
      <div className="relative">
        <div className="fixed bg-[url('../images/bg.webp')] bg-fixed w-screen h-screen bg-cover bg-no-repeat bg-center brightness-[0.4]" />
        <div className="absolute w-full">
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={routerConfig} />
          </QueryClientProvider>
        </div>
        {isLoading && (
          <div className="absolute z-10">
            <LoadingBar />
          </div>
        )}
      </div>
    </>
  );
};
export default App;
