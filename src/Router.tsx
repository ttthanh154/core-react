import { createBrowserRouter, RouteObject } from "react-router-dom";
// components
import NotFound from "./components/common/Notfound";
import Home from "./components/modules/Home";
import Login from "./components/modules/Login";
import AuthLayout from "./components/layout/AuthLayout";
import Register from "./components/modules/Register";
import PrivateRoute from "./components/common/PrivateRoute";
import AdminRoute from "./components/common/AdminRoute";
import UserLayout from "./components/layout/UserLayout";
import User from "./components/modules/User/User";
import Book from "./components/modules/Book/Book";
import BookDetail from "./components/modules/Book/BookDetail";
import Layout from "./components/layout/Layout";
import Order from "./components/modules/Order/Order";
import History from "./components/modules/History/History";
import OrderManagement from "./components/modules/Order/OrderManagement";
import Dashboard from "./components/modules/Dashboard/Dashboard";
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
    element: <Layout />,
    path: "/",
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "detail-book/:slug",
        element: <BookDetail />,
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
        path: 'order',
        element: 
        <PrivateRoute>
          <Order/>
        </PrivateRoute>
      },
      {
        path: 'history',
        element: 
        <PrivateRoute>
          <History/>
        </PrivateRoute>
      },
      //Admin
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Dashboard />
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
            <AdminRoute>
            <Book />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'order/management',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <OrderManagement/>
            </AdminRoute>
          </PrivateRoute>
        )
      },
      
    ],
  },
];

const Router = createBrowserRouter(listRoute);

export default Router;
