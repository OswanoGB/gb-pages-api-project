import { useLocation, useNavigate } from "react-router-dom";
import Form from "../Components/Form";
import { useAuth } from "../Hooks/useAuth";

const Login = () => {
    const items = [
		{ type: 'text', name: 'Usuario', id: 'username', placeholder: 'Juan Perez' },
		{ type: 'password', name: 'Contraseña', id: 'password', placeholder: '******' }
	];

    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    let from = location.state?.from?.pathname || "/";

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const validate = Array.from(formData.values());

        if (validate.some(it => it === "") || validate.length <= 0) {
            alert('Llena todos los campos primero');
            return;
        }

        const body = Object.fromEntries(formData.entries());

        auth.signIn(body, 
        () => {
            navigate(from, { replace: true });
        },
        () => {
            alert('error');
        })

    }
    
    return (
        <div className="-mt-10 w-screen h-screen px-10 flex flex-col items-center justify-center space-y-10 max-w-screen-sm mx-auto">
            <h1 className="font-bold text-lg">¡Bienvenido!<br /><span className="text-base">Inicia sesión para acceder a las páginas</span></h1>
            <Form items={items} submitText={"Iniciar sesión"} handleSubmit={handleSubmit} />
        </div>
    )
}

export default Login;