import { createSlice } from "@reduxjs/toolkit";

type calenderSchema = {
  title: string;
  eventType: string;
  date: string;
  color: string;
};

interface schema {
  eventList: calenderSchema[];
}

const initialState: schema = {
  eventList: [],
};

const calenderSlice = createSlice({
  name: "calender",
  initialState,
  reducers: {
    calenderAddEvent: (state, action) => {
      state.eventList.push(action.payload);
    },
  },
});

export const { calenderAddEvent } = calenderSlice.actions;
export default calenderSlice.reducer;
