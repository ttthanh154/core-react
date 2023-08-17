import { useAppSelector } from "@utils/hook";
import { Navigate } from "react-router-dom";
import NotPermitted from "./NotPermitted";

const CheckAdmin = (props: any) => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const userRole = useAppSelector((state) => state.user.user.role);

  if (isAdminRoute && userRole === "ADMIN") {
    return <>{props.children}</>;
  } else {
    return <NotPermitted />;
  }
};

const AdminRoute = (props: any) => {
  return (
    <>
      {localStorage.getItem("access_token") ? (
        <CheckAdmin>{props.children}</CheckAdmin>
      ) : (
        <Navigate to={"/login"} replace />
      )}
    </>
  );
};

export default AdminRoute;
