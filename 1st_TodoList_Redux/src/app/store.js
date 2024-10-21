import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../app/todoSlice";

export const store = configureStore({
  reducer: todoReducer,
});
