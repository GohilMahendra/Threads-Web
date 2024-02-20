import React from "react";
import { useDispatch } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slices/UserSlice";

// const persistConfig = {
//     key: "root",
//     storage: AsyncStorage,
//   };

const RootReducer = combineReducers({
    User: UserReducer
})
const store = configureStore({
    reducer: RootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export default store