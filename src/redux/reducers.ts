import {
  ADD_GENRE,
  ADD_USERINFO,
  DELETE_USERINFO,
  IS_SHOW_MODAL,
  REMOVE_GENRE,
  RESET_GENRES,
  SET_DATA,
  SET_SELECTED_YEAR,
  SET_SORT_VALUE,
  SET_YEARS,
} from "./actionTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const initialState = {
  data: [],
  userInfo: {},
  isShowModal: false,
};

const dataReducer = (state: { data: Array<any>; isShowModal: boolean } = initialState, action: PayloadAction<any>) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, data: action.payload };
    case IS_SHOW_MODAL:
      return { ...state, isShowModal: action.payload };
    case ADD_USERINFO:
      return { ...state, userInfo: action.payload };
    case DELETE_USERINFO:
      return { ...state, userInfo: {} };
    default:
      return state;
  }
};

const filtersInitialState = {
  choosedGenres: [],
  sortBy: "popularity.desc",
  years: [],
  year: "",
};

const filtersReducer = (
  state: { choosedGenres: Array<any>; years: Array<number>; year: string | number } = filtersInitialState,
  action: PayloadAction<any>
) => {
  switch (action.type) {
    case ADD_GENRE:
      return { ...state, choosedGenres: action.payload };
    case REMOVE_GENRE:
      return { ...state, choosedGenres: state.choosedGenres.filter((genre) => genre.id !== action.payload) };
    case RESET_GENRES:
      return { ...state, choosedGenres: [] };
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
