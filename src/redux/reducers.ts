import { ADD_GENRE, IS_SHOW_MODAL, REMOVE_GENRE, RESET_GENRES, SET_DATA, SET_SELECTED_YEAR, SET_SORT_VALUE, SET_YEARS } from "./actionTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const initialState = {
  data: [],
  isShowModal: false,
};

const dataReducer = (state: { data: Array<any>; isShowModal: boolean } = initialState, action: PayloadAction<any>) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, data: action.payload };
    case IS_SHOW_MODAL:
      return { ...state, isShowModal: action.payload };
    default:
      return state;
  }
};

const filtersInitialState = {
  genres: [],
  sortBy: "popularity.desc",
  years: [],
  year: "",
};

const filtersReducer = (
  state: { genres: Array<any>; years: Array<number>; year: string | number } = filtersInitialState,
  action: PayloadAction<any>
) => {
  switch (action.type) {
    case ADD_GENRE:
      return { ...state, genres: action.payload };
    case REMOVE_GENRE:
      return { ...state, genres: state.genres.filter((genre) => genre.id !== action.payload) };
    case RESET_GENRES:
      return { ...state, genres: [] };
    case SET_SORT_VALUE:
      return { ...state, sortBy: action.payload };
    case SET_YEARS:
      return { ...state, years: action.payload };
    case SET_SELECTED_YEAR:
      return { ...state, year: action.payload };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  data: dataReducer,
  filters: filtersReducer,
});
