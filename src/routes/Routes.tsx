import React from "react";
import Pages from "../pages";
import { Routes as BrowserRoutes, Route } from "react-router";
import { DashboardLayout } from "../components/layouts";

export const Routes = () : React.ReactNode => (
    <BrowserRoutes>
        <Route element={<DashboardLayout />}>
            <Route index element={<Pages.DashboardPage />} />
        </Route>
        <Route>
            <Route path="/login" element={<Pages.LoginPage />} />
        </Route>
        <Route path="*" element={<Pages.NotFoundPage />} />
    </BrowserRoutes>
)