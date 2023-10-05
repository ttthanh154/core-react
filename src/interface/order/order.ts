export interface IDetailCart {
  bookName: string;
  quantity: number;
  _id: string;
}

export interface IOrderFields {
  name: string;
  phone: string;
  address: string;
  payment: string;
}

export interface IOderUserInfo {
  name?: string;
  phone?: string;
  address?: string;
  totalPrice?: number;
  detail?: IDetailCart[];
}

export interface IOrderHistory {
  createdAt: string;
  detail: [];
  key: string;
  status: string;
  stt: string;
  totalPrice: string;
}

export interface IOrderManagement {
  address: string;
  createdAt: string;
  detail: IDetailCart[];
  name: string;
  phone: string;
  totalPrice: number;
  type: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
