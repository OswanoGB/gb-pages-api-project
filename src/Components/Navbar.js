import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faUsers, faPen, faListUl, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import { useState } from 'react';

const Navbar = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [ activeItem, setActiveItem ] = useState(3);

    return (
        <div className="vh-10 w-full bg-primary fixed bottom-0 flex justify-evenly items-center z-10">
            {
                auth?.user?.role === "admin" &&
                <Link 
                    to="/my" 
                    className={`flex flex-col items-center justify-center space-y-2 md:text-2xl lg:text-3xl ${ activeItem === 1 && 'text-blue-800' }`}
                    onClick={() => setActiveItem(1)}
                >
                    <Icon icon={faUsers} />
                    <span className="text-xs">Mis Posts</span>
                </Link>
            }
            {
                auth.user?.role === "admin" && 
                <Link
                    to="/create"
                    className={`flex flex-col items-center justify-center space-y-2 md:text-2xl lg:text-3xl ${ activeItem === 2 && 'text-blue-800' }`}
                    onClick={() => setActiveItem(2)}
                >
                    <Icon icon={faPen} />
                    <span className="text-xs">Crear</span>
                </Link>
            }
            <Link 
                to="/"
                className={`flex flex-col items-center justify-center space-y-2 md:text-2xl lg:text-3xl ${ activeItem === 3 && 'text-blue-800' }`}
                onClick={() => setActiveItem(3)}
            >
                <Icon icon={faListUl} />
                <span className="text-xs">Ver Todos</span>
            </Link>
            <button onClick={() => {
                auth.signOut(() => navigate("/login"));
            }} className="flex flex-col items-center justify-center space-y-2 md:text-2xl lg:text-3xl">
                <Icon icon={faTimes} />
                <span className="text-xs">Salir</span>
            </button>
        </div>
    )
}

export default Navbar;