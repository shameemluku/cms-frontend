import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicRoute from "../Components/Auth/PublicRoute";
import LoginPage from "../Pages/Login";
import BoardingLayout from "../Pages/BoardingLayout";
import ProtectedRoute from "../Components/Auth/ProtectedRoute";
import FlowBoard from "../Pages/Admin/FlowBoard";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute roleRequired={1}/>}>
          <Route path="/" element={<BoardingLayout />} />
        </Route>
        <Route path="/admin" element={<ProtectedRoute roleRequired={1}/>}>
          <Route path="" element={<FlowBoard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
