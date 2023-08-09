import { Outlet } from "react-router-dom";
import Loading from "../common/Loading";
import { useAppDispatch, useAppSelector } from "@utils/hook";

const AuthLayout = () => {
  return (
    <>
      <div className="layout-app">
        <div className="layout-app__content">
          {useAppSelector((state) => state.global.loading) && <Loading />}
          <div className="layout-app__content-showing">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
