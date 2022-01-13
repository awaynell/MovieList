import { ADD_GENRE, REMOVE_GENRE, RESET_GENRES, SET_DATA, SET_SORT_VALUE } from "./actionTypes";
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
  sortBy: "popularity.desc",
};

const filtersReducer = (state: { genres: Array<any> } = filtersInitialState, action: PayloadAction<any>) => {
  switch (action.type) {
    case ADD_GENRE:
      return { ...state, genres: action.payload };
    case REMOVE_GENRE:
      return { ...state, genres: state.genres.filter((genre) => genre.id !== action.payload) };
    case RESET_GENRES:
      return { ...state, genres: [] };
    case SET_SORT_VALUE:
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  data: dataReducer,
  filters: filtersReducer,
});
