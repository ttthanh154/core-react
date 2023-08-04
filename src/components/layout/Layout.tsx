import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Layout = () => {
  return (
    <>
      <div className="layout-app">
        <div className="layout-app__header">
          <Header />
        </div>
        <div className="layout-app__content">
          <Outlet />
        </div>
        <div className="layout-app__footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
