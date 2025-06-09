/*
Standard layout to display "main" content in the center of the view/screen
*/

import React from "react";
import { Outlet } from "react-router";

const VERSION_NUMBER = import.meta.env.VITE_APP_VERSION ?? "Development";

export const CenterContentLayout = () : React.ReactNode => (
    <main className="relative h-screen flex justify-center items-center">
        <Outlet />
        <div className="absolute bottom-0 right-0 text-primary px-3 py-1 opacity-50">
            <p>Compliance Linc by Stuart Harrison. Version: {VERSION_NUMBER}</p>
        </div>
    </main>
);