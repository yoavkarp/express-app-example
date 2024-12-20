export type IUser = {
    _id: string;
    name: string;
    email: string;
    phone_number: string;
    roles: UserRole[];
    createdAt: Date;
    updatedAt: Date;
}

export const UserRoles = ['admin', 'user'] as const;
export type UserRole = typeof UserRoles[number];