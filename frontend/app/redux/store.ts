import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import AuthSlice from './features/auth'
import RecipeSlice from './features/recipes'

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    recipe: RecipeSlice
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() // Export a hook that can be reused to resolve types
export const useAppSelector = useSelector.withTypes<RootState>() // Export a hook that can be reused to resolve types

export default store