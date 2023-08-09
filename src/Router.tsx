import { createBrowserRouter, RouteObject } from "react-router-dom";
// components
import Layout from "./components/layout/Layout";
import NotFound from "./components/common/Notfound";
import Contact from "./components/modules/Contact";
import About from "./components/modules/About";
import Home from "./components/modules/Home";
import Login from "./components/modules/Login";
import AuthLayout from "./components/layout/AuthLayout";
import Register from "./components/modules/Register";

const listRoute: RouteObject[] = [
  {
    element: <AuthLayout />,
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
    element: <Layout />,
    path: "/",
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
];

const Router = createBrowserRouter(listRoute);

export default Router;
