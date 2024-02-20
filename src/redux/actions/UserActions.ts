import { createAsyncThunk } from "@reduxjs/toolkit"
import { loginUser } from "../../api/UserApi"
import { SignUpArgsType, UpdateArgsType, User, UserResponse } from "../../types/User"
import { Alert } from "@mui/material"

export const SignInAction = createAsyncThunk(
    "user/SignInAction",
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await loginUser(email, password)
            const userResponse = response.user as UserResponse
             localStorage.setItem("token", userResponse.token)
             localStorage.setItem("email", email)
             localStorage.setItem("password", password)
            const user: User =
            {
                email: userResponse.email,
                followers: userResponse.followers,
                following: userResponse.following,
                _id: userResponse._id,
                username: userResponse.username,
                profile_picture: userResponse.profile_picture,
                fullname: userResponse.fullname,
                bio: userResponse.bio,
                verified: userResponse.verified,
                isFollowed: false
            }
            return user
        }
        catch (err:any) { 

            return rejectWithValue(JSON.stringify(err))
        }
    })
