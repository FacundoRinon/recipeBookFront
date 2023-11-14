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
      const { follow, user } = action.payload;

      const updatedUser = {
        ...user,
        following: user.following.includes(follow._id)
          ? user.following.filter((id) => id !== follow._id)
          : [...user.following, follow._id],
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
