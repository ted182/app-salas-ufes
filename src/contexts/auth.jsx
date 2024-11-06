// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import { auth } from '../services/database';

const AuthContext = createContext();
//const localStringStorage = '@tickets';

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    //const [email, setEmail] = useState('');
    //const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        /*
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                console.log('Logged In');
                setUser(currentUser);
            }
            else {
                console.log('Not Logged In');
                //navigate('/login');
            };
            setLoadingAuth(false);
        });
        // when you need to remove the listener, call unsubscribe
        return () => unsubscribe();
        */
    }, []);

    const login = async (email, password) => {

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Usuário autenticado:', userCredential.user);
            navigate('/listas');

        } catch (err) {
            console.error('Erro ao fazer login:', err);
        };

    };

    const cadastrar = async (email, password) => { };

    const logout = () => {
        //localStorage.removeItem(localStringStorage);
        signOut(auth);
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider
            value={{
                signed: !!user, // retorna falso se user estiver vazio
                user,
                loadingAuth,
                cadastrar,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
