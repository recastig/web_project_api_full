import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../contexts/AppContext";

export default function ProtectedRoute({ children, anonymous = false }) {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { isLoggedIn } = useContext(AppContext);

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} replace />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
