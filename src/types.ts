export type User = {
	displayName: string;
	email: string;
	id: number;
	language: string;
	timezone: string;
	datetimeFormat: string;
	permissions: string[];
	roles?: Array<{
		roleIdentifier: string;
	}>;
};

export type LanguageMessage = {
	en: string;
	value: string;
};

export type Todo = {
	id: number;
	title: string;
	finishedAt: string;
};

export type Role = {
	identifier: string;
	displayName: string;
	description: string;
	displayOrder: number;
};

export type Permission = {
	identifier: string;
	displayName: string;
	description: string;
	displayOrder: number;
};

export type RolePermissions = {
	role: Role;
	permissions: Permission[];
};

export type Invitation = {
	identifier: string;
	expiredAt: string;
	createdAt: string;
};
