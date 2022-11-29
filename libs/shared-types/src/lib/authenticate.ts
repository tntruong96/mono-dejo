

interface IInfo {
    userName: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

export interface ILogin {
    userName: string;
    password: string;
}

export interface IRegister extends IInfo {
    password: string;
    passwordConfirm: string;
}

export interface UserProfile extends IInfo{
    role: string
    id: number;
}

export enum ROLE {
    ADMIN= 'admin',
    USER='user'
}