import React from "react";
import { useAuth } from "@/hooks/useAuth";

interface AuthorizedComponentProps {
    resource: "products" | "customers" | "suppliers" | "orders";
    action: "create" | "read" | "update" | "delete";
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export const AuthorizedComponent: React.FC<AuthorizedComponentProps> = ({
    resource,
    action,
    children,
    fallback,
}) => {
    const { user } = useAuth();
    const hasAccess = user ? hasAccess(user, resource, action) : false;
    return hasAccess ? <>{children}</> : <>{fallback}</>;
};
