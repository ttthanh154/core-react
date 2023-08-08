import { Outlet } from "react-router-dom";


const AuthLayout = () => {
  return (
    <>
      <div className="layout-app">
        <div className="layout-app__content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
