import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Null for loading state

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/cookie", {
          credentials: "include",
        });
        const data = await response.json();
        setIsAuthenticated(data.status === 200);
      } catch (error) {
        console.error("Error verifying user:", error);
        setIsAuthenticated(false);
      }
    };

    verifyUser();
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>; // Show loading state
  if (!isAuthenticated) return <Navigate to="/login" />; // Redirect if not authenticated

  return <Outlet />; // Render child routes
};

export default ProtectedRoute;
