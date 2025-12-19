import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserAndRedirect = async () => {
            try {
                const response = await fetch("http://localhost:5000/auth/me", {
                    credentials: "include",
                });

                if (!response.ok) {
                    navigate("/login");
                    return;
                }

                const userData = await response.json();

                // Role-based redirect
                if (userData.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/"); // customers go to home
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                navigate("/login");
            }
        };

        fetchUserAndRedirect();
    }, [navigate]);

    return <p>Signing you in...</p>;
};

export default AuthSuccess;
