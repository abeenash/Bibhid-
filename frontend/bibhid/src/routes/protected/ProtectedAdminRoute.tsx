import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);


    useEffect(() => {
        const verify = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/auth/me",
                    { withCredentials: true }
                );

                if (res.data.role === "admin") {
                    setAuthorized(true);
                } else {
                    setAuthorized(false);
                }
            } catch {
                setAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        verify();
    }, []);

    if (loading) return <p>Checking auth...</p>;

    if (!authorized) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedAdminRoute;
