import { createBrowserRouter, RouteObject } from "react-router-dom";
// components
import Layout from "./components/layout/Layout";
import NotFound from "./components/common/Noutfound";
import Contact from "./components/modules/Contact";
import About from "./components/modules/About";
import Home from "./components/modules/Home";
// import { Counter } from "./components/modules/Counter";

const listRoute: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: 'contact',
        element: <Contact/>
      },
      {
        path: 'about',
        element: <About/>
      }
    ]
  },
];

const Router = createBrowserRouter(listRoute);

export default Router;
