export interface IUser {
  avatar: string;
  createdAt: string;
  email: string;
  fullName: string;
  isActive: boolean;
  phone: string;
  role: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface IUserDataType {
  key?: React.Key;
  _id: string;
  fullName: number;
  email: number;
  phone: number;
}


export interface IUserFieldType  {
  fullName?: string;
  password?: string;
  email?: string;
  phone?: string;
};