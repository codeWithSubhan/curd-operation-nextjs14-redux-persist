import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OrderType = {
  id: string;
  donar: string;
  panel: string;
  barcode: string;
  source: string;
  date: string;
  amount: string;
  observed: string;
  status: string;
};

interface OrderState {
  orderData: OrderType[];
}

const initialState: OrderState = {
  orderData: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderCreate: (state, action) => {
      state.orderData.push(action.payload);
    },
    orderEditDelete: (state, action) => {
      state.orderData = action.payload;
    },
  },
});

export const { orderCreate, orderEditDelete } = orderSlice.actions;
export default orderSlice.reducer;
