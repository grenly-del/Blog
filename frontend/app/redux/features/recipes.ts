import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios, { Axios, type AxiosResponse } from "axios";
import axiosConfig from "../../config/axiosConfig";

interface Recipe {
  _id?: string;
  name?: string;
  ingredients?: string[];
  instructions?: string;
  imageUrl?: string;
  cookingTime?: number;
  userOwner?: string;
  createdAt?: Date | string;
}

interface ResponseRecipe {
  message?: string;
  data: Recipe[];
  success: boolean;
  error: boolean;
  loading: boolean;
  filter_data?: Recipe[]
}

const initialValue: ResponseRecipe = {
  data: [],
  message: "",
  success: false,
  error: false,
  loading: false,
  filter_data: []
};

interface RecipeResponseAxios extends AxiosResponse {
  message: string;
  payload: Recipe[];
  code: number;
}

export const GetAllRecipe = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("recipe/getAllRecipe", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<RecipeResponseAxios>(
      "http://localhost:3005/api/v1/recipe"
    );
    return response.data.payload;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.payload?.message ||
        error.message ||
        "Terjadi kesalahan!"
    );
  }
});

export const GetAllRecipeByUser = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("recipe/getAllRecipeByUser", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosConfig.get<RecipeResponseAxios>(
      "/recipe/with-id"
    );
    return response.data.payload;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.payload?.message ||
        error.message ||
        "Terjadi kesalahan!"
    );
  }
});

const RecipeSlice = createSlice({
  name: "recipe",
  initialState: initialValue,
  reducers: {
    clearRecipe: (state) => {
      state.filter_data = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(GetAllRecipe.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
      state.message = "";
    })
    builder.addCase(
      GetAllRecipe.fulfilled,
      (state, action: PayloadAction<RecipeResponseAxios>) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.data = action.payload.payload;
        state.message = action.payload.message;
      }
    )
    builder.addCase(
      GetAllRecipe.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload || "Terjadi kesalahan!";
      }
    )
    builder.addCase(GetAllRecipeByUser.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
      state.message = "";
    })
    builder.addCase(
      GetAllRecipeByUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.filter_data = action.payload.payload;
        state.message = action.payload.message;
      }
    )
    builder.addCase(
      GetAllRecipeByUser.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload || "Terjadi kesalahan!";
      }
    )
  },
});


export const {clearRecipe} = RecipeSlice.actions
export default RecipeSlice.reducer;
