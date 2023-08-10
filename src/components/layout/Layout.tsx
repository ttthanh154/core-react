import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import AuthApi from "@api/Auth/AuthApi";
import { useEffect } from "react";
import { useAppDispatch } from "@utils/hook";
import { fetchAccount } from "@store/slice/userSlice";

const Layout = () => {
  const dispatch = useAppDispatch();

  const getAccount = async () => {
    const res = await AuthApi.fetchAccount();
    console.log(">>>res: ", res);
    dispatch(fetchAccount(res.data.user));
  };

  useEffect(() => {
    getAccount();
  }, []);

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
