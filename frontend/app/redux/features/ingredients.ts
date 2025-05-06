import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TagsState {
  value?: string[];
}

const initialState: TagsState = {
  value: ['Water', 'Salt'], // nilai awal
};

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<string[]>) => {
        state.value = action.payload
    },
    removeTag: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload
    },
    setTags: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload;
    },
    resetTags: (state) => {
      state.value = [];
    }
  }
});

export const { addTag, removeTag, setTags, resetTags } = tagsSlice.actions;

export default tagsSlice.reducer;
