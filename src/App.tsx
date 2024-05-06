import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ErrorLayout from "./layouts/ErrorLayout";
import AuthPage from "./pages/AuthPage";
import ChatPage from "./pages/ChatPage";

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

const App = () => <RouterProvider router={routerConfig} />;
export default App;
