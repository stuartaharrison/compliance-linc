import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { usePocket } from "../../hooks/PocketProvider";

export const DashboardLayout = () : React.ReactNode => {
    const location = useLocation();
    const { isValid, user } = usePocket();

    if (!isValid || !user) {
        return <Navigate to={{ pathname: '/login' }} state={{ location }} replace />
    }

    return (
        <Outlet />
    );
};