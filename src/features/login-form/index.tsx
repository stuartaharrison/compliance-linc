import React from "react";
import Forms from "../../components/forms";
import { Controller, useForm  } from "react-hook-form";
import { usePocket } from "../../hooks/PocketProvider";
import { ErrorMessage } from "@hookform/error-message";

type LoginRequest = {
    emailAddress: string,
    password: string
};

export type LoginFormProps = {
    onLoginCallback: (r: boolean) => void
};

export const LoginForm = ({ onLoginCallback } : Readonly<LoginFormProps>) : React.ReactNode => {
    const { login } = usePocket();
    const { control, clearErrors, formState: { errors }, handleSubmit, setError } = useForm<LoginRequest>({ defaultValues: { emailAddress: '', password: '' } });

    const onSubmit = (form: LoginRequest) : void => {
        login(form.emailAddress, form.password).then(
            () => {
                clearErrors();
                onLoginCallback(true)
            },
            () => {
                setError('emailAddress', { type: 'custom', message: 'Invalid Email Address and/or Password' })
                onLoginCallback(false);
            }
        );
    };

    return (
        <div className="card bg-base-200 w-sm">
            <div className="bg-primary text-primary-content rounded-tl rounded-tr flex flex-col justify-center items-center p-4">
                <figure>
                    <img src="/images/logo_trans_white.png" alt="logo_white_trans" className="w-24" />
                </figure>
                <h1 className="font-bold">Welcome! Please sign in.</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body grid grid-cols-1 gap-3">
                <ErrorMessage
                    errors={errors}
                    name="emailAddress"
                    render={({ message }) => <p className="text-error login-error">{message}</p>}
                />
                <Controller 
                    name="emailAddress"
                    control={control}
                    rules={{ required: 'Email Address is required.' }}
                    render={({ field }) => (
                        <Forms.TextInput label="Email Address" placeholder="hello-you@compliance-linc.io" {...field} />
                    )}
                />
                <Controller 
                    name="password"
                    control={control}
                    rules={{ required: 'Password is required.' }}
                    render={({ field }) => (
                        <Forms.TextInput type="password" placeholder="Your Password" label="Password" {...field} />
                    )}
                />
                <Forms.Button variant="success" className="uppercase w-full">
                    Sign in
                </Forms.Button>
            </form>
        </div>
    )
};