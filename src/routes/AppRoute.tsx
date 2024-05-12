import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicRoute from "../Components/Auth/PublicRoute";
import LoginPage from "../Pages/Login";
import BoardingLayout from "../Pages/BoardingLayout";
import ProtectedRoute from "../Components/Auth/ProtectedRoute";
import FlowBoard from "../Pages/Admin/FlowBoard";
import AdminLayout from "../Pages/Admin/Layout";
import Users from "../Pages/Admin/Users";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute roleRequired={2} />}>
          <Route path="/" element={<BoardingLayout />} />
        </Route>
        <Route path="/admin" element={<ProtectedRoute roleRequired={1} />}>
          <Route
            path=""
            element={
              <AdminLayout children={<FlowBoard />} active={"customization"} />
            }
          />
          <Route
            path="users"
            element={<AdminLayout children={<Users />} active={"users"} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
