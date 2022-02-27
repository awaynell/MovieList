import {
  ADD_GENRE,
  CURRENT_PAGE,
  DELETE_USERINFO,
  IS_SHOW_MODAL,
  REMOVE_GENRE,
  SET_DATA,
  SET_SEARCHED_FILMS_SUCCESS,
  SET_SEARCH_PAGE,
  SET_SEARCH_QUERY,
  SET_SELECTED_YEAR,
  SET_SORT_VALUE,
  SET_YEARS,
  SET_YEARS_START,
  UPDATE_FAVOURITES,
  UPDATE_FAVOURITES_SUCCESS,
  UPDATE_WATCHLIST,
  UPDATE_WATCHLIST_SUCCESS,
} from "./actionTypes";

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

export const isShowModal = (payload: boolean) => ({
  type: IS_SHOW_MODAL,
  payload,
});

export const deleteUserInfo = () => ({
  type: DELETE_USERINFO,
});

export const updateFavourites = (payload: object) => ({
  type: UPDATE_FAVOURITES,
  payload,
});

export const setFavouritesMovies = (payload: Array<any>) => ({
  type: UPDATE_FAVOURITES_SUCCESS,
  payload,
});

export const updateWatchlist = (payload: object) => ({
  type: UPDATE_WATCHLIST,
  payload,
});

export const setWatchlist = (payload: Array<any>) => ({
  type: UPDATE_WATCHLIST_SUCCESS,
  payload,
});

export const setCurrentPage = (payload: number) => ({
  type: CURRENT_PAGE,
  payload,
});

export const setSearchQuery = (payload: string) => ({
  type: SET_SEARCH_QUERY,
  payload,
});

export const setSearchPage = (payload: number) => ({
  type: SET_SEARCH_PAGE,
  payload,
});

export const setSearchedFilms = (payload: object) => ({
  type: SET_SEARCHED_FILMS_SUCCESS,
  payload,
});
