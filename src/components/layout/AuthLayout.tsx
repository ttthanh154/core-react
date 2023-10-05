import { Outlet } from "react-router-dom";
import Loading from "../common/Loading";
import { useAppSelector } from "@utils/hook";

const AuthLayout = () => {
  return (
    <>
      <div className="layout-app">
        <div className="layout-app__content">
          <div className="layout-app__content-showing">
          {useAppSelector((state) => state.global.loading) && <Loading />}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
