import React from "react";
import Pages from "../pages";
import Layouts from "../components/layouts";
import { Routes as BrowserRoutes, Route } from "react-router";

export const Routes = () : React.ReactNode => (
    <BrowserRoutes>
        <Route element={<Layouts.DashboardLayout />}>
            <Route index element={<Pages.DashboardPage />} />
        </Route>
        <Route element={<Layouts.CenterContentLayout />}>
            <Route path="/login" element={<Pages.LoginPage />} />
            <Route path="*" element={<Pages.NotFoundPage />} />
        </Route>
    </BrowserRoutes>
)