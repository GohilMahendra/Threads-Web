import React from "react";
import { useDispatch } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slices/UserSlice";
import FeedReducer from "./slices/FeedSlice";
import ConversationsReducer from "./slices/ConversationSlice";
// const persistConfig = {
//     key: "root",
//     storage: AsyncStorage,
//   };

const RootReducer = combineReducers({
    User: UserReducer,
    Feed: FeedReducer,
    Conversations: ConversationsReducer
})
const store = configureStore({
    reducer: RootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export default store