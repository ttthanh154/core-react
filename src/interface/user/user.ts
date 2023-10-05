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
  fullName: string;
  email: string;
  phone: string;
}


export interface IUserFieldType  {
  _id?: string;
  fullName?: string;
  password?: string;
  email?: string;
  phone?: string;
};

export interface IUserUpload extends Omit<IUserDataType,'_id, email'> {
  avatar: string;
}
