export type User = {
    name: string;
    email: string;
    phone_number: string;
    roles: UserRole[];
    createdAt: Date;
    updatedAt: Date;
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}