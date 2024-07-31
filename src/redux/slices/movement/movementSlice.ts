import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

import { requestMovements, requestScrap } from "./movementActions";

export type Movement = {
  id: number;
  institution: string;
  pending: boolean;
  amount: number;
  currency: string;
  date: string;
  valueDate: string;
  description: string;
  userDescription: string | null;
};

type MovementsState = {
  movements: Movement[];
  loadingMovements: boolean;
  loadingScrap: boolean;
  successScrap: boolean;
};

const initialState: MovementsState = {
  movements: [],
  loadingMovements: false,
  loadingScrap: false,
  successScrap: false,
};

const movementsSlice = createSlice({
  name: "movements",
  initialState,
  reducers: {
    resetScrap(state) {
      state.loadingScrap = false;
      state.successScrap = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestMovements.pending, (state) => {
      state.loadingMovements = true;
    });
    builder.addCase(requestMovements.rejected, (state) => {
      state.loadingMovements = false;
    });
    builder.addCase(requestMovements.fulfilled, (state, action) => {
      // const movements = action.payload.movements.map((movement) => {
      //   return {
      //     ...movement,
      //     date: moment(movement.date),
      //     valueDate: moment(movement.valueDate),
      //   };
      // });
      const movements = action.payload.movements;
      console.log("peo");
      state.movements = movements.sort((a, b) =>
        moment(b.valueDate).diff(moment(a.valueDate))
      );
      state.loadingMovements = false;
      console.log(state.movements[0]);
    });
    builder.addCase(requestScrap.pending, (state) => {
      state.loadingScrap = true;
    });
    builder.addCase(requestScrap.rejected, (state) => {
      state.loadingScrap = false;
      state.successScrap = false;
    });
    builder.addCase(requestScrap.fulfilled, (state) => {
      state.loadingScrap = false;
      state.successScrap = true;
    });
  },
});

export const { resetScrap } = movementsSlice.actions;

export default movementsSlice.reducer;
