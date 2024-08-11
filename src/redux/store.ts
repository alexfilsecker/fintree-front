import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth/authSlice";
import categoriesReducer from "./slices/categories/categoriesSlice";
import movementsReducer from "./slices/movement/movementSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  movements: movementsReducer,
  categories: categoriesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
