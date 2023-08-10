export interface IRegisterFieldType {
    fullName?: string;
    email?: string;
    password?: string;
    phone?: number;
    // remember?: string;
}

export interface ILoginFieldType {
    username: string;
    password: string;
}

export interface IRegisterData {
    _id?: string;
    email?: string;
    fullName?: string;
}