import { useAuth } from "../../Hooks/useAuth";
import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} />
    }

    return children;
}

export default RequireAuth;