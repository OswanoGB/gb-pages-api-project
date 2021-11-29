import { createContext, useState } from 'react';
import { authProvider } from '../Providers/authProvider';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    let [user, setUser] = useState(null);

    let signIn = (body, callback, error) => {
        return authProvider.signin(body, 
            (data) => {
                setUser(data);
                callback();
            },
            error
        )
    }

    let signOut = (callback) => {
        return authProvider.signout(() => {
            setUser(null);
            callback();
        })
    }

    let value = { user, signIn, signOut };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider;