import { ADD_GENRE, REMOVE_GENRE, SET_DATA, SET_SELECTED_YEAR, SET_SORT_VALUE, SET_YEARS, SET_YEARS_START } from "./actionTypes";

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

export const setYearsStarting = () => ({
  type: SET_YEARS_START,
});

export const setYears = (payload: Array<number>) => ({
  type: SET_YEARS,
  payload,
});

export const setSelectedYear = (payload: string | number) => ({
  type: SET_SELECTED_YEAR,
  payload,
});
