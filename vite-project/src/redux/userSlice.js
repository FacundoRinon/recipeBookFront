import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setToken(state, action) {
      return action.payload;
    },
    removeToken(state, action) {
      return null;
    },
    toggleFollow: (state, action) => {
      const { follow } = action.payload;
      const isFollowing = state.following.includes(follow);
      const updatedFollowing = isFollowing
        ? state.following.filter((id) => id !== follow)
        : [...state.following, follow];

      const updatedUser = {
        ...state,
        following: updatedFollowing,
      };
      return updatedUser;
    },
    toggleRecipeBook: (state, action) => {
      const { user, recipe } = action.payload;

      const recipeExistsInCookingBook = user.cookingBook.some(
        (bookRecipe) => bookRecipe.id === recipe.id
      );

      const updatedUser = {
        ...user,
        cookingBook: recipeExistsInCookingBook
          ? user.cookingBook.filter((bookRecipe) => bookRecipe.id !== recipe.id)
          : [...user.cookingBook, recipe],
      };
      return updatedUser;
    },
    removeRecipe: (state, action) => {
      const { user, recipe } = action.payload;

      const updatedUser = {
        ...user,
        recipes: user.recipes.filter(
          (userRecipe) => userRecipe.id !== recipe.id
        ),
      };
      return updatedUser;
    },
  },
});

const { actions, reducer } = userSlice;
export const {
  setToken,
  removeToken,
  toggleFollow,
  toggleRecipeBook,
  removeRecipe,
} = actions;
export default reducer;
