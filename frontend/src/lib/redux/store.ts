import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import taskReducer from "./slices/tasks-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      tasks: taskReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
