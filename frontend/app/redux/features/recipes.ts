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
  search_data?: Recipe[]
}

const initialValue: ResponseRecipe = {
  data: [],
  message: "",
  success: false,
  error: false,
  loading: false,
  filter_data: [],
  search_data: []
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
    },
    searchProduct: (state, action) => {
      // Salin data produk
          const products = JSON.parse(JSON.stringify(state.data));

          // Buat regex berdasarkan input pencarian, dengan flag case-insensitive
          const searchRegex = new RegExp(action.payload, "i");

          // Filter produk berdasarkan pencocokan dengan regex
          state.search_data = products?.filter((product:Recipe) =>
              searchRegex.test(product.name?? '') // Cek apakah nama produk cocok dengan regex
          );
  },
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
        state.search_data = action.payload.payload
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


export const {clearRecipe, searchProduct} = RecipeSlice.actions
export default RecipeSlice.reducer;
