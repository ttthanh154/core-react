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
import AdminLayout from "./components/layout/AdminLayout";
import UserLayout from "./components/layout/UserLayout";
const userRole = localStorage.getItem("role");
const listRoute: RouteObject[] = [
  {
    element: <AuthLayout />,
    errorElement: <NotFound />,
    path: "/",
    children: [
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
    element: userRole === "ADMIN" ? <AdminLayout /> : <UserLayout />,
    path: userRole === "ADMIN" ? "/admin/" : "/",
    errorElement: <NotFound />,
    children: [
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
    ],
  },
];

const Router = createBrowserRouter(listRoute);

export default Router;
