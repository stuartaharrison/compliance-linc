import React from "react";
import classNames from "classnames";

interface FormButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    variant?: FormTheme,
    size?: FormSize
};

export const Button = React.forwardRef<HTMLButtonElement, FormButtonProps>(
    ({ children, className, variant = 'primary', size = 'md', ...props } : Readonly<FormButtonProps>, ref) => (
    <button ref={ref} className={classNames("btn", className, {
        'btn-xs': size === 'xs',
        'btn-sm': size === 'sm',
        'btn-lg': size === 'lg',
        'btn-xl': size === 'xl',
        'btn-primary': variant === 'primary',
        'btn-secondary': variant === 'secondary',
        'btn-accent': variant === 'accent',
        'btn-warning': variant === 'warning',
        'btn-info': variant === 'info',
        'btn-success': variant === 'success',
        'btn-error': variant === 'danger'
    })} {...props}>
        {children}
    </button>
));