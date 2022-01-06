import { ADD_GENRE, CURRENT_PAGE, REMOVE_GENRE, RESET_GENRES, SET_DATA } from "./actionTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const initialState = {
  data: [],
  page: 1,
};

const dataReducer = (state: { data: Array<any>; page: number } = initialState, action: PayloadAction<any>) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, data: action.payload };
    case CURRENT_PAGE:
      return {...state, page: action.payload }
    default:
      return state;
  }
};

const genreInitialState = {
  genres: [],
};

const genreReducer = (state: { genres: Array<any> } = genreInitialState, action: PayloadAction<any>) => {
  switch (action.type) {
    case ADD_GENRE:
      return { ...state, genres: action.payload };
    case REMOVE_GENRE:
      return { ...state, genres: state.genres.filter((genre) => genre.id !== action.payload) };
    case RESET_GENRES:
      return { ...state, genres: [] };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  data: dataReducer,
  genres: genreReducer,
});
