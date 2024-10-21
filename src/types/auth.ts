type Role = "admin" | "seller" | "customer";

interface User {
    id: string;
    email: string;
    name: string;
    picture?: string;
    role: Role;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
}
