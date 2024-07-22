import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { type Moment } from "moment";

import { requestMovements } from "./movementActions";

export type Movement = {
  institution: string;
  pending: boolean;
  amount: number;
  currency: string;
  date: Moment;
  valueDate: Moment;
  description: string;
  userDescription: string;
};

type MovementsState = {
  movements: Movement[];
  loadingMovements: boolean;
};

const initialState: MovementsState = {
  movements: [],
  loadingMovements: false,
};

const movementsSlice = createSlice({
  name: "movements",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestMovements.pending, (state) => {
      state.loadingMovements = true;
    });
    builder.addCase(requestMovements.rejected, (state) => {
      state.loadingMovements = false;
    });
    builder.addCase(requestMovements.fulfilled, (state, action) => {
      const movements = action.payload.movements.map((movement) => ({
        ...movement,
        date: moment(movement.date, "DD/MM/2024"),
        valueDate: moment(movement.valueDate, "DD/MM/2024"),
      }));
      state.movements = movements.sort((a, b) => b.valueDate.diff(a.valueDate));
      state.loadingMovements = false;
    });
  },
});

export default movementsSlice.reducer;
