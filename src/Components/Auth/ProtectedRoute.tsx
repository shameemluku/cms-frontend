import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthLoading from "../../Components/Loaders/AuthLoading";
import useFindUser from "../../hook/useFindUser";

const ProtectedRoute = ({
  roleRequired = 1,
}: {
  roleRequired?: number | string;
}) => {
  const { pathname } = useLocation();
  const { user, isLoading } = useFindUser();

  if (isLoading) {
    return <AuthLoading />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: pathname }} replace />;
  }

  if (roleRequired && Number(user.role) !== Number(roleRequired)) {
    // Redirect or show unauthorized message based on your requirement
    return <Navigate to={Number(user.role) === 2 ? "" : "/admin"} />;
  }

  return <Outlet />;
};
export default ProtectedRoute;
