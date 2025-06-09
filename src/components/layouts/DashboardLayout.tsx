import React from "react";
import classNames from "classnames";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { usePocket } from "../../hooks/PocketProvider";
import { Navigate, NavLink, Outlet, useLocation } from "react-router";
import { IoDocumentLock, IoHomeSharp } from "react-icons/io5";
import { FaKey } from "react-icons/fa";

// TODO: do we move these out? I'm thinking they will only really be used here?
// TODO: take out the navigation into a JSON file so we can create a mobile menu as well...

const DashboardHeader = () : React.ReactNode => {
    const breadcrumbs = useBreadcrumbs();
    return (
        <header className="bg-base-100 p-4 shadow-sm flex justify-between items-center sticky top-0 z-10">
            <div className="breadcrumbs text-lg font-semibold">
                <ul>
                    {breadcrumbs.map((el) => (
                        <li key={el.match.pathname}>
                            <NavLink to={el.match.pathname}>{el.breadcrumb}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}

const DashboardSideMenuItem = (
    { to, icon, tooltip } : Readonly<{ to: string, icon: React.ReactNode, tooltip?: string | null | undefined }>
) : React.ReactNode => (
     <li className={classNames('mb-2' as any, { 'tooltip tooltip-right': tooltip } as any)} data-tip={tooltip}>
        <NavLink
            to={to}
            className="flex justify-center items-center, w-full text-center text-2xl"
            style={{ backgroundColor: 'transparent' }}
        >
            {({ isActive }) => (
                <span className={classNames({ 'text-white': !isActive, 'text-secondary': isActive } as any)}>{icon}</span>
            )}
        </NavLink>
    </li>
);

const DashboardSideMenu = () : React.ReactNode => (
    <aside className="bg-primary text-white flex flex-col items-center py-4 md:h-screen">
        <div className="mb-5">
            <img src="/images/logo_trans_white.png" alt="Logo" className="w-12 h-12" />
        </div>
        <nav className="menu rounded-box flex-1 gap-4 z-40">
            <DashboardSideMenuItem to="/" tooltip="Dashboard" icon={<IoHomeSharp />} />
            <DashboardSideMenuItem to="/licences" tooltip="Licences" icon={<FaKey />} />
            <DashboardSideMenuItem to="/documents" tooltip="Documents & Reports" icon={<IoDocumentLock />} />
        </nav>
    </aside>
);

export const DashboardLayout = () : React.ReactNode => {
    const location = useLocation();
    const { isValid, user } = usePocket();

    if (!isValid || !user) {
        return <Navigate to={{ pathname: '/login' }} state={{ location }} replace />
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-[4rem_1fr] min-h-screen">
            <DashboardSideMenu />
            <div className="flex flex-col">
                <DashboardHeader />
                <Outlet />
            </div>
        </div>
    );
};