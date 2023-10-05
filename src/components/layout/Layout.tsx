import { Outlet, useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Loading from "../common/Loading";
import { useAppDispatch, useAppSelector } from "@utils/hook";
import { loading } from "@store/slice/globalSlice";
import AuthApi from "@api/Auth/AuthApi";
import { fetchAccount } from "@store/slice/userSlice";
import { useEffect } from "react";

const Layout = () => {
   const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const getAccount = async () => {
    if (token) {
      dispatch(loading(true));
      try {
        const res = await AuthApi.fetchAccount();
        dispatch(fetchAccount(res.data.user));
        dispatch(loading(false));
      } catch (error) {
        dispatch(loading(false));
      }
    }
     else {
      // navigate("/login");
      dispatch(loading(false));
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <>
      <div className="layout-app">
        <div className="layout-app__content">
          <div className="layout-app__content-showing">
            {useAppSelector((state) => state.global.loading) && <Loading />}

            <Header />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
