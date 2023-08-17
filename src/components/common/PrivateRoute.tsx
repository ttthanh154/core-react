import { Navigate } from "react-router-dom";

const PrivateRoute = (props: any) => {
  return (
    <>
      {localStorage.getItem('access_token') ? (
        <>{props.children}</>
      ) : (
        <Navigate to={"/login"} replace />
      )}
    </>
  );
};

export default PrivateRoute;
