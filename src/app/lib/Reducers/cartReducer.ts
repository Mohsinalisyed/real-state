import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  totalItem: number | null;
}
const initialState: CartState = {
  totalItem: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartItem: (state, action: PayloadAction<CartState>) => {
      const { totalItem } = action.payload;
      state.totalItem = totalItem;
    },
  },
});
export const { cartItem } = cartSlice.actions;
export default cartSlice.reducer;
