import { ADD_GENRE, REMOVE_GENRE, RESET_GENRES, SET_DATA } from "./actionTypes";

export const setDataAction = (payload: any) => ({
  type: SET_DATA,
  payload,
});

export const addGenre = (payload: any) => ({
  type: ADD_GENRE,
  payload,
});

export const removeGenre = (payload: any) => ({
  type: REMOVE_GENRE,
  payload,
});

export const resetGenres = (payload: any) => ({
  type: RESET_GENRES,
});
