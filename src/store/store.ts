import { configureStore } from "@reduxjs/toolkit";
import square from "./features/squareSlice";

export const store = configureStore({
  reducer: {
    square: square,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
