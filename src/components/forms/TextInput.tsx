/*
Provides a reusable component for displaying a consistant looking text input field across the application.
*/

import React from "react";
import classnames from "classnames";
import { type FormProps } from "./types";

export type TextInputProps = React.HTMLProps<HTMLInputElement> & FormProps;

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    ({ className, error, icon, label, parentClass, placeholder, type = "text", ...rest } : Readonly<TextInputProps>, ref) => 
(
    <label className={classnames("form-control", parentClass)}>
        {label && (
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
        )}
        <label className={classnames("input input-bordered flex items-center gap-2 w-full" as any, className as any, { 'input-error': error } as any)}>
            {icon && (<div className="text-primary">{icon}</div>)}
            <input
                ref={ref}
                className="grow"
                placeholder={placeholder}
                type={type}
                {...rest}
            />
        </label>
        {error && (
            <div className="label">
                <span className="label-text-alt text-error">
                    {typeof (error) === 'string' ? (error) : (error.message)}
                </span>
            </div>
        )}
    </label>
));