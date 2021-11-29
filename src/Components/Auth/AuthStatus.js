import { useNavigate } from "react-router";
import { useAuth } from "../../Hooks/useAuth";

const AuthStatus = () => {
    let auth = useAuth();
    let navigate = useNavigate();

    if (!auth.user) {
        return <p>Not logged in</p>;
    }
    
    return (
        <>
            <p>Welcome</p>
            <button onClick={() => auth.signOut(() => navigate("/"))}>Sign Out</button>
        </>
    )
}

export default AuthStatus;