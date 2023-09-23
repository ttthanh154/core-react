import { createBrowserRouter, RouteObject } from "react-router-dom";
// components
import NotFound from "./components/common/Notfound";
import Contact from "./components/modules/Contact";
import About from "./components/modules/About";
import Home from "./components/modules/Home";
import Login from "./components/modules/Login";
import AuthLayout from "./components/layout/AuthLayout";
import Register from "./components/modules/Register";
import PrivateRoute from "./components/common/PrivateRoute";
import Admin from "./components/modules/Admin";
import AdminRoute from "./components/common/AdminRoute";
import UserLayout from "./components/layout/UserLayout";
import User from "./components/modules/User/User";
import Book from "./components/modules/Book/Book";
const listRoute: RouteObject[] = [
  {
    element: <AuthLayout />,
    errorElement: <NotFound />,
    path: "/",
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  {
    element: <UserLayout />,
    path: "/",
    errorElement: <NotFound />,
    children: [
      //User
      {
        index: true,
        element: (
          <PrivateRoute>
            <Home />,
          </PrivateRoute>
        ),
      },
      {
        path: "contact",
        element: (
          <PrivateRoute>
            <Contact />,
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        element: (
          <PrivateRoute>
            <About />,
          </PrivateRoute>
        ),
      },
      //Admin
      {
        path: "admin",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Admin />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "user",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <User />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "book",
        element: (
          <PrivateRoute>
            <Book />
          </PrivateRoute>
        ),
      },
    ],
  },
];

const Router = createBrowserRouter(listRoute);

export default Router;
