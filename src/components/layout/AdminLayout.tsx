import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "../common/Navigation";
import AuthApi from "@api/Auth/AuthApi";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@utils/hook";

import { fetchAccount } from "@store/slice/userSlice";
import { loading } from "@store/slice/globalSlice";
import Loading from "../common/Loading";

const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const getAccount = async () => {
    dispatch(loading(true));
    if (token) {
      try {
        const res = await AuthApi.fetchAccount();
        dispatch(fetchAccount(res.data.user));
        dispatch(loading(false));
      } catch (error) {
        dispatch(loading(false));
      }
    } else {
      navigate("/login");
      dispatch(loading(false));
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <>
      <div className="layout-app">
        {useAppSelector((state) => state.global.loading) ? (
          <>
            <div className="layout-app__content">
              <Loading />
            </div>
          </>
        ) : (
          <>
            <div className="layout-app__content">
              <div className="layout-app__content-showing">
                <Navigation>
                <Outlet />
                </Navigation>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminLayout;
