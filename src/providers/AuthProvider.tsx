import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <RecoilRoot>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
                <QueryClientProvider client={queryClient}>
                    <RecoilRoot>{children}</RecoilRoot>
                </QueryClientProvider>
            </GoogleOAuthProvider>
        </RecoilRoot>
    );
}