import { ADD_GENRE, REMOVE_GENRE, SET_DATA, SET_SORT_VALUE } from "./actionTypes";

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

export const setSortValue = (payload: "popularity.desc" | "popularity.asc" | "vote_average.desc" | "vote_average.asc") => ({
  type: SET_SORT_VALUE,
  payload,
});
