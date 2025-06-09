/*
Configures the connection and communication to the backend pocketbase server
*/

import ms from "ms";
import React from "react";
import PocketBase from "pocketbase";
import Client, { type RecordAuthResponse, type RecordModel } from "pocketbase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useInterval } from "usehooks-ts";

const twoMinutesInMs = ms("2 minutes");
const fiveMinutesInMs = ms("5 minutes");
const queryClient = new QueryClient();
const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL!;

queryClient.setDefaultOptions({ });

export type PocketContextProps = {
    isValid: boolean,
    login: (email: string, password: string) => Promise<RecordAuthResponse<RecordModel>>
    logout: () => void
    pb: Client
    requestNewPassword: (email: string) => Promise<boolean>,
    token: string | null
    user: UserType | null
};

export const PocketContext = React.createContext<PocketContextProps>({
    isValid: false,
    login: (() => {}) as any,
    logout: () => {},
    pb: { } as any,
    requestNewPassword: (() => {}) as any,
    token: null,
    user: null
});

export const usePocket = () => React.useContext(PocketContext);

export const PocketProvider = ({ children } : Readonly<{ children: React.ReactNode }>) : React.ReactNode => {
    const pb = React.useMemo(() => new PocketBase(pocketbaseUrl), []);
    const [token, setToken] = React.useState<string | null>(pb.authStore.token);
    const [user, setUser] = React.useState<UserType | null>(pb.authStore.record ? { ...pb.authStore.record } as UserType : null);

    const login = async (email: string, password: string) => await pb.collection("users").authWithPassword(email, password);

    const logout = () => pb.authStore.clear();

    const requestNewPassword = async (email: string) => await pb.collection('users').requestPasswordReset(email);

    React.useEffect(() => {
        return pb.authStore.onChange((token, model) => {
            setToken(token);
            setUser(model ? { ...model } as UserType : null);
        });
    }, []);

    const refreshSession = React.useCallback(async () => {
        if (!pb.authStore.isValid || !token) {
            return;
        }

        const decoded = jwtDecode(token);
        if (!decoded?.exp) {
            return;
        }

        const tokenExpiration = decoded.exp;
        const expirationWithBuffer = (decoded.exp + fiveMinutesInMs) / 1000;

        if (!tokenExpiration || tokenExpiration < expirationWithBuffer) {
            await pb.collection("users").authRefresh();
        }
    }, [token]);

    useInterval(refreshSession, token ? twoMinutesInMs : null);

    return (
        <PocketContext.Provider value={{ 
            isValid: pb.authStore.isValid,
            login,
            logout,
            pb,
            requestNewPassword,
            token,
            user
        }}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </PocketContext.Provider>
    );
};