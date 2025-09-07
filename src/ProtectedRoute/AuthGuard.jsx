import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AuthGuard = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [showRedirect, setShowRedirect] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("You must be logged in to access this page.");
      setShowRedirect(true);
    }
  }, [isAuthenticated]);

  if (showRedirect) {
    return <Navigate to="/login" replace />;
  }

  return isAuthenticated ? children : null;
};

export default AuthGuard;
