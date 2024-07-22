import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth/authSlice";
import movementsReducer from "./slices/movement/movementSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  movements: movementsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
