import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthLoading from "../../Components/Loaders/AuthLoading";
import useFindUser from "../../hook/useFindUser";

const PublicRoute: React.FC = () => {
  const { pathname } = useLocation();
  const { user, isLoading } = useFindUser();

  if (isLoading) {
    return <AuthLoading />;
  }

  if (user) {
    return (
      <Navigate
        to={Number(user?.role) === 2 ? "" : "/admin"}
        state={{ from: pathname }}
        replace
      />
    );
  }

  return <Outlet />;
};

export default PublicRoute;
