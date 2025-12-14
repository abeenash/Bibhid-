import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedAdminRoute;