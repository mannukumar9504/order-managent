import React, { useState, createContext } from 'react';

export const AuthContext = createContext({
    auth: {
        token: localStorage.getItem('token'),
        role: null,
        _id: '',
    },
    loader: false,
    snackbarConfig: {},
});

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        role: null,
        _id: '',
    });
    const [loader, setLoader] = useState(false);
    const [snackbarConfig, setSnackbarConfig] = useState({});

    return (
        <AuthContext.Provider value={{
            auth, setAuth, loader, setLoader, snackbarConfig, setSnackbarConfig,
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
