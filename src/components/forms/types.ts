import React from "react";

export type FormProps = {
    error?: Error | string | undefined
    icon?: React.ReactNode | null | undefined
    label?: string | React.ReactNode | null,
    parentClass?: any | null | undefined
};