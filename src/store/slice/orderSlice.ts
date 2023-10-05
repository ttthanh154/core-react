import { IBook } from "@interface/book";
import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IQuantityItemChange{
  number: number;
  id: string;
}

export interface CartItem {
  quantity: number;
  _id: string;
  detail: IBook;
}

export interface OrderState {
  carts: CartItem[];
}

const initialState: OrderState = {
  carts: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    addBook: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const isExistIndex = state.carts.findIndex(
        (i: CartItem) => i._id === item._id
      );

      if (isExistIndex !== -1) {
        const updatedCarts = state.carts.map((cart:CartItem) => {
          if (cart._id === item._id) {
            const totalQuantity = cart.quantity + item.quantity;
            const limitedQuantity = Math.min(totalQuantity, item.detail.quantity);           
            return {
              ...cart,
              quantity: limitedQuantity,
            };
          } else {
            return cart;
          }
        });

        state.carts = updatedCarts;
      } else {
        state.carts = [...state.carts, item];
      }
    },
    changeQuantity: (state, action: PayloadAction<IQuantityItemChange>) => {
      const item = action.payload;
      // console.log(current(state));
      // console.log(item)
      const isExistIndex = state.carts.findIndex((i:CartItem) => {
        i._id === item.id; 
      })

      if(isExistIndex){
        const updatedCarts = state.carts.map((cart:CartItem) => {
          if(cart._id === item.id){
            const newQuantity = item.number;
            const checkQuantityCondition = (newQuantity:any) => {
              if(newQuantity < 1) return;
              if(newQuantity > cart.detail.quantity) return;
              return newQuantity;
            }
            return {
              ...cart,
              quantity: checkQuantityCondition(newQuantity)
            }
          } else {
            return cart
          }
        }) 
        state.carts = updatedCarts;
      }
    },
    finishOrder: (state) => {
      state.carts = [];
    }
  },
});

// Action creators are generated for each case reducer function
export const { addBook, changeQuantity,finishOrder } = orderSlice.actions;

export default orderSlice.reducer;
