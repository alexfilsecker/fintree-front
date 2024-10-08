import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import {
  basicFulfilledState,
  basicInitialState,
  basicPendingState,
  basicRejectedState,
  type BasicState,
} from "../basicState";

import {
  patchUserDescription,
  requestMovements,
  requestScrap,
} from "./movementActions";

import getIdFromUrl from "@/utils/getIdFromUrl";

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

type OtherStates = {
  userDescriptionState: BasicState;
};

export type MovementWithStates = Movement & OtherStates;

type MovementsState = {
  movements: Record<number, MovementWithStates>;
  loadingMovements: boolean;
  loadingScrap: boolean;
  successScrap: boolean;
};

const initialState: MovementsState = {
  movements: {},
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
    resetUserDescriptionState(state, action: PayloadAction<number>) {
      state.movements[action.payload].userDescriptionState = basicInitialState;
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
      const movements = action.payload.movements;
      movements.forEach((movement) => {
        state.movements[movement.id] = {
          ...movement,
          userDescriptionState: basicInitialState,
        };
      });
      state.loadingMovements = false;
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
    builder.addCase(patchUserDescription.pending, (state, action) => {
      const movementId = getIdFromUrl(action.meta.url, 1);
      state.movements[movementId].userDescriptionState = basicPendingState;
    });
    builder.addCase(patchUserDescription.fulfilled, (state, action) => {
      const movementId = getIdFromUrl(action.meta.url, 1);
      state.movements[movementId].userDescription =
        action.meta.arg.userDescription;
      state.movements[movementId].userDescriptionState = basicFulfilledState;
    });
    builder.addCase(patchUserDescription.rejected, (state, action) => {
      if (action.meta.url !== undefined) {
        const movementId = getIdFromUrl(action.meta.url, 1);
        state.movements[movementId].userDescriptionState = basicRejectedState;
      }
    });
  },
});

export const { resetScrap, resetUserDescriptionState } = movementsSlice.actions;

export default movementsSlice.reducer;
