import { ADD_GENRE, CURRENT_PAGE, REMOVE_GENRE, SET_DATA } from "./actionTypes";

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

export const setPage = (payload: number) => ({
  type: CURRENT_PAGE,
  payload,
});
