export enum UserRole {
	ADMIN,
	CUSTOMER,
	SUPPLIER,
	ACCOUNTING,
}

export interface User {
	id: string;
	email: string;
	name: string;
	picture?: string;
	role: UserRole;
}

interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	loading: boolean;
}
