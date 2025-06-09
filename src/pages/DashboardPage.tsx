/*
Main Dashboard view after logging in or navigating to the root
*/
import React from "react"

export const DashboardPage = () : React.ReactNode => {
    return (
        <main className="p-4 grid gap-4">
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl shadow">Widget 1</div>
                <div className="bg-white p-4 rounded-xl shadow">Widget 2</div>
                <div className="bg-white p-4 rounded-xl shadow">Widget 3</div>
            </section>
        </main>
    );
};