/*
Displays the login authentication page form.
*/

import React from "react";
import { LoginForm } from "../features/login-form";
import { useNavigate } from "react-router";

export const LoginPage = () : React.ReactNode => {
    const navigate = useNavigate();

    const onLoginCallback = (result: boolean) => {
        if (result) {
            navigate('/');
        }
    }

    return <LoginForm onLoginCallback={onLoginCallback} />
}