export interface IBook {
    _id: string;
    thumbnail: string;
    slider: [];
    mainText: string;
    author: string;
    price: any;
    sold: number;
    quantity: number;
    category: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IBookFields {
    _id?: string;
    thumbnail: string;
    slider?: [];
    mainText: string;
    author: string;
    price: number;
    sold: number;
    quantity: number;
    category: string;
}

export interface IOptions {
    value: string;
    label: string;
}