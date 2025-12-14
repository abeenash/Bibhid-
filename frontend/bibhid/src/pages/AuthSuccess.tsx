import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (!token) {
            navigate("/login");
            return;
        }

        // TEMP (we’ll improve this)
        localStorage.setItem("access_token", token);

        navigate("/admin"); // or "/" or "/dashboard"
    }, []);

    return <p>Signing you in...</p>;
};

export default AuthSuccess;
