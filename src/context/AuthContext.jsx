import { createContext, useState, useContext, useEffect, Component } from "react";
import Cookies from "js-cookie";
import {signin,verifyTokenRequest} from '../services/auth.service'

/**
 * Creates the context of the current user
 */
const AuthContext = createContext()
/**
 * Export the function to use the context body
 * @returns {Context} Context
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("No AuthContext")
    }
    return context
}
/**
 * Contains the functions of the Context
 * In order to have the user info in the whole app
 * @param {*} param0 
 * @returns {Component} AuthContext.Provider that envolves the app 
 * */
export const AuthProvider = ({ children }) => {
    const [userLogin, setUserLogin] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    // const [loading, setLoading] = useState(true)
    const signinContext = async (user) => {
        try {
            const res = await signin(user)
            console.log(res.user)
            setIsAuthenticated(true)
            setUserLogin(res)
            console.log('asasd')
            
            return res
        } catch (err) {
            console.error(err)
        }
    }
    // const logoutContext = async (event) => {
    //     // Prevenir el redirect al login
    //     event.preventDefault();
    //     event.stopPropagation();
    //     //Quitar la cookie del user
    //     Cookies.remove("token");
    //     setUserLogin(null);
    //     setIsAuthenticated(false);
    // };

    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                // setLoading(false)
                return;
            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                console.log('-', res);
                if (!res) return setIsAuthenticated(false);
                setIsAuthenticated(true);
                setLoading(false)
                setUserLogin(res);

            } catch (error) {
                setIsAuthenticated(false);
                setLoading(false)
            }
        };
        checkLogin();
    }, []);

    return (
        //Valores_funciones que pueden ser usadas en los hijos del contexto
        <AuthContext.Provider value={{
            signinContext,
            // logoutContext,
            userLogin,
            // isAuthenticated,
            // loading,
            // setLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}