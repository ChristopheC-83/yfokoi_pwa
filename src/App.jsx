import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ConnectedRoute from "./components/layout/ConnectedRoute";
import NoConnectedRoute from "./components/layout/NoConnectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import SharedList from "./pages/Lists/SharedList";
import LockedList from "./pages/Lists/LockedList";
import MyFriends from "./pages/MyFriends";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },

      {
        path: "login",
        element: (
          <NoConnectedRoute>
            <Login />
          </NoConnectedRoute>
        ),
      },
      {
        path: "register",
        element: (
          <NoConnectedRoute>
            <Register />
          </NoConnectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ConnectedRoute>
            <Profile />
          </ConnectedRoute>
        ),
      },
      {
        path: "lockedList",
        element: (
          <ConnectedRoute>
            <LockedList />
          </ConnectedRoute>
        ),
      },
      {
        path: "sharedList",
        element: (
          <ConnectedRoute>
            <SharedList />
          </ConnectedRoute>
        ),
      },
      {
        path: "myFriends",
        element: (
          <ConnectedRoute>
            <MyFriends />
          </ConnectedRoute>
        ),
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
