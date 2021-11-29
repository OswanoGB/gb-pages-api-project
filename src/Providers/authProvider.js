import axios from 'axios';

const authProvider = {
    isAuthenticated: false,
    
    signin: async (body, callback, error) => {
        try {
            const { data } = await axios.post(process.env.REACT_APP_API + "/auth/signin", body);
            callback(data);
            authProvider.isAuthenticated = true;
        } catch(err) {
            const { response } = err;
            error(response);
        }
    },

    signout: (callback) => {
        authProvider.isAuthenticated = false;
        callback && callback();
    }
}

export { authProvider };
