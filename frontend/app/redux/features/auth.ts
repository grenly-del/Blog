import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import axios from 'axios'
import Cookies from 'js-cookie'
import {jwtDecode } from 'jwt-decode'
import { clearRecipe } from "./recipes";

interface MyToken {
    userId: string
    username: string
    exp: number;
    iat: number;
}

interface AuthType {
    token?: string
    username?:MyToken
}

const initialValue:AuthType = {
    token: ''
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialValue,
    reducers: {
        setAuth: (state, action: PayloadAction<string>) => {
            if(action.payload) {
                const user = jwtDecode<MyToken>(action.payload)
                state.username = user
                state.token = action.payload
                console.log(`Barhasil : ${action.payload}`)
                Cookies.set('auth_token', action.payload)
            }
        },
        logout: (state) => {
            Cookies.remove('auth_token')
        }
    }
})

export const {setAuth, logout} = AuthSlice.actions
export default AuthSlice.reducer