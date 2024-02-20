import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { User } from "../../types/User";
import { Thread } from "../../types/Post";
import { FetchPostsPayload } from "../types/global";
import {  SignInAction} from "../actions/UserActions";
type UserStateType =
    {
        user: User,
        Posts: Thread[],
        loading: boolean,
        error: null | string,
        morePostsLoading: boolean,
        morePostsError: null | string,
        lastOffset: string | null,
        screenLoading: boolean
    }

const initalUser: User =
{
    email: "",
    followers: 0,
    following: 0,
    _id: "",
    bio: "",
    username: "",
    fullname: "",
    verified: false,
    profile_picture: "",
    isFollowed: false
}
const initialState: UserStateType =
{
    user: initalUser,
    loading: false,
    error: null,
    Posts: [],
    lastOffset: null,
    morePostsError: null,
    morePostsLoading: false,
    screenLoading: false
}


export const UserSlice = createSlice({
    name: "User",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers(builder) {
        builder.addCase(SignInAction.pending, state => {
            state.loading = true
            state.error = null
        })
        builder.addCase(SignInAction.fulfilled, (state, action: PayloadAction<User>) => {
            state.loading = false
            state.user = action.payload
        })
        builder.addCase(SignInAction.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
    }
})
export const { setUser } = UserSlice.actions
export default UserSlice.reducer