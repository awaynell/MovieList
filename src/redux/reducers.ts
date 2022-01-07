import { ADD_GENRE, CURRENT_PAGE, REMOVE_GENRE, RESET_GENRES, SET_DATA } from "./actionTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const initialState = {
  data: [],
};

const dataReducer = (state: { data: Array<any> } = initialState, action: PayloadAction<any>) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

const filtersInitialState = {
  genres: [],
  currentPage: 1,
};

const filtersReducer = (state: { genres: Array<any>; currentPage: number } = filtersInitialState, action: PayloadAction<any>) => {
  switch (action.type) {
    case ADD_GENRE:
      return { ...state, genres: action.payload };
    case REMOVE_GENRE:
      return { ...state, genres: state.genres.filter((genre) => genre.id !== action.payload) };
    case RESET_GENRES:
      return { ...state, genres: [] };
    case CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  data: dataReducer,
  filters: filtersReducer,
});
