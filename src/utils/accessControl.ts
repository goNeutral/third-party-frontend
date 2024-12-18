import { User, UserRole } from '@/types/auth';

export interface AccessControlConfig {
	create: UserRole[];
	read: UserRole[];
	update: UserRole[];
	delete: UserRole[];
}

export const resourceAccessControls: Record<string, AccessControlConfig> = {
	products: {
		create: [UserRole.ADMIN],
		read: [
			UserRole.ADMIN,
			UserRole.ACCOUNTING,
			UserRole.CUSTOMER,
			UserRole.SUPPLIER,
		],
		update: [UserRole.ADMIN],
		delete: [UserRole.ADMIN],
	},
	customers: {
		create: [UserRole.ADMIN],
		read: [UserRole.ADMIN, UserRole.ACCOUNTING, UserRole.CUSTOMER],
		update: [UserRole.ADMIN, UserRole.CUSTOMER],
		delete: [UserRole.ADMIN, UserRole.CUSTOMER],
	},
	suppliers: {
		create: [UserRole.ADMIN],
		read: [UserRole.ADMIN, UserRole.ACCOUNTING, UserRole.SUPPLIER],
		update: [UserRole.ADMIN, UserRole.SUPPLIER],
		delete: [UserRole.ADMIN, UserRole.SUPPLIER],
	},
	orders: {
		create: [UserRole.ADMIN],
		read: [
			UserRole.ADMIN,
			UserRole.ACCOUNTING,
			UserRole.CUSTOMER,
			UserRole.SUPPLIER,
		],
		update: [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SUPPLIER],
		delete: [UserRole.ADMIN, UserRole.CUSTOMER, UserRole.SUPPLIER],
	},
};

export function hasAccess(
	user: User | null,
	resource: 'products' | 'customers' | 'suppliers' | 'orders',
	action: 'create' | 'read' | 'update' | 'delete'
): boolean {
	if (user === null || user === undefined) return false;
	if (user.role === null || user.role === undefined) return false;

	if (!Object.keys(resourceAccessControls).includes(resource)) return false;
	const resourceConfig = resourceAccessControls[resource];

	return resourceConfig[action].includes(user.role);
}
