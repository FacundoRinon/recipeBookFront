import { createSlice } from "@reduxjs/toolkit";

const recipesSlice = createSlice({
  name: "recipes",
  initialState: [],
  reducers: {
    setRecipes(state, action) {
      return action.payload;
    },
    removeRecipes(state, action) {
      return null;
    },
    addRecipe(state, action) {
      state.unshift(action.payload);
    },
  },
});

const { actions, reducer } = recipesSlice;
export const { setRecipes, removeRecipes, addRecipe } = actions;
export default reducer;
