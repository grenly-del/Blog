import { createAsyncThunk } from "@reduxjs/toolkit"
import { logout } from "./auth"
import { clearRecipe } from "./recipes"

export const logoutThunk = createAsyncThunk(
    "auth/logoutThunk",
    async (_, { dispatch }) => {
        dispatch(logout())       // hapus token dari state dan cookie
        dispatch(clearRecipe())  // hapus data resep
    }
)