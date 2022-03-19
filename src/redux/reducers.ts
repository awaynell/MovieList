import { searchedMovies } from "./selectors";
import {
  ADD_GENRE,
  ADD_USERINFO,
  CURRENT_PAGE,
  DELETE_USERINFO,
  IS_SHOW_MODAL,
  REMOVE_GENRE,
  RESET_GENRES,
  SET_DATA,
  SET_PREVIOUS_ROUTEPATH,
  SET_SEARCHED_FILMS_SUCCESS,
  SET_SEARCH_PAGE,
  SET_SEARCH_QUERY,
  SET_SELECTED_YEAR,
  SET_SORT_VALUE,
  SET_YEARS,
  UPDATE_FAVOURITES,
  UPDATE_FAVOURITES_SUCCESS,
  UPDATE_SEARCH_LOADING,
  UPDATE_WATCHLIST_SUCCESS,
} from "./actionTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const initialState = {
  data: [],
  userInfo: {},
  isShowModal: false,
  currentPage: 1,
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
    case CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
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

const favouriteAndWatchInitialState = {
  favouriteIDs: [],
  watchlistIDs: [],
};

const favouriteAndWatchReducer = (
  state: { favouriteIDs: Array<number>; watchlistIDs: Array<number> } = favouriteAndWatchInitialState,
  action: PayloadAction<any>
) => {
  switch (action.type) {
    case UPDATE_FAVOURITES_SUCCESS:
      return { ...state, favouriteIDs: action.payload };
    case UPDATE_WATCHLIST_SUCCESS:
      return { ...state, watchlistIDs: action.payload };
    default:
      return state;
  }
};

const searchInitialState = {
  searchQuery: "",
  page: 1,
  searchedMovies: {},
  loading: true,
  prevRoutePath: "/",
};

const searchReducer = (
  state: { searchQuery: string; page: number; searchedMovies: object; prevRoutePath: string } = searchInitialState,
  action: PayloadAction<any>
) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case SET_SEARCH_PAGE:
      return { ...state, page: action.payload };
    case SET_SEARCHED_FILMS_SUCCESS:
      return { ...state, searchedMovies: action.payload };
    case UPDATE_SEARCH_LOADING:
      return { ...state, loading: action.payload };
    case SET_PREVIOUS_ROUTEPATH:
      return { ...state, prevRoutePath: action.payload };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  data: dataReducer,
  filters: filtersReducer,
  favouritesAndWatchlist: favouriteAndWatchReducer,
  search: searchReducer,
});
