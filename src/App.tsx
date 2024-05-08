import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ErrorLayout from "./layouts/ErrorLayout";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";
import { useContext } from "react";
import { LoaderContext } from "./store/context/loaderContext";
import Loader from "./components/Loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

  return (
    <>
      <div className="relative">
        <div className="absolute w-screen">
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={routerConfig} />
          </QueryClientProvider>
        </div>
        {isLoading && (
          <div className="bg-black bg-opacity-80 w-screen h-screen absolute flex flex-row justify-center items-center">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};
export default App;
