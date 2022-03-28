import { getUserInfo } from "./../helpers/authHelpers/getUser";
import { put, select, takeEvery, takeLeading } from "redux-saga/effects";
import { getYears } from "../helpers/getYears";
import {
  ADD_USERINFO,
  ADD_USERINFO_START,
  DELETE_USERINFO,
  SET_SEARCH_PAGE,
  SET_SEARCH_QUERY,
  SET_YEARS,
  SET_YEARS_START,
  UPDATE_FAVOURITES,
  UPDATE_SEARCH_LOADING,
  UPDATE_WATCHLIST,
} from "./actionTypes";
import * as Effects from "redux-saga/effects";
import { setFavouritesMovies, setSearchedFilms, setWatchlist } from "./actionCreators";
import { logout } from "../helpers/authHelpers/logout";
import { getSessionIDFromCookie } from "../helpers/authHelpers/getSessionIDFromCookie";
import { getFavouriteMovies } from "../helpers/getFavouriteMovies";
import { setFavouriteFilm } from "../helpers/setFavouriteFilm";
import { setWatchlistMovie } from "../helpers/setWatchlistMovie";
import { getWatchlist } from "../helpers/getWatchlist";
import { searchPage, searchQuery } from "./selectors";
import { getSearchedMovies } from "../helpers/getSearchedMovie";

const call: any = Effects.call;

function* getYearsSaga() {
  const years: Array<number> = yield call(getYears);
  yield put({ type: SET_YEARS, payload: years.reverse() });
}

function* getUserFromCookieSaga() {
  const userInfo: object = yield call(getUserInfo, getSessionIDFromCookie().value);
  yield put({ type: ADD_USERINFO, payload: userInfo });
}

function* updateFavouritesSaga(action: any) {
  yield call(
    setFavouriteFilm,
    action.payload.userID,
    action.payload.movieID,
    action.payload.isFavourite,
  );
  const favouriteMovies: any[] = yield call(getFavouriteMovies, action.payload.userID, {
    language: "ru-RU",
  });
  const res = favouriteMovies.map((item: { id: number }) => item.id);
  yield put(setFavouritesMovies(res));
}

function* updateWatchlistSaga(action: any) {
  yield call(
    setWatchlistMovie,
    action.payload.userID,
    action.payload.movieID,
    action.payload.isWatched,
  );
  const watchlistMovies: any[] = yield call(getWatchlist, action.payload.userID, {
    language: "ru-RU",
  });
  const res = watchlistMovies.map((item: { id: number }) => item.id);
  yield put(setWatchlist(res));
}

function* userLogoutSaga() {
  yield call(logout);
}

function* searchFilms() {
  yield put({ type: UPDATE_SEARCH_LOADING, payload: true });
  const searchQ: string = yield select(searchQuery);
  const page: number = yield select(searchPage);
  const result: object = yield call(getSearchedMovies, {
    query: searchQ,
    language: "ru-RU",
    page: page,
  });
  yield put(setSearchedFilms(result));
  yield put({ type: UPDATE_SEARCH_LOADING, payload: false });
}

export function* rootSaga() {
  yield takeLeading(SET_YEARS_START, getYearsSaga);
  yield takeEvery(DELETE_USERINFO, userLogoutSaga);
  yield takeEvery(ADD_USERINFO_START, getUserFromCookieSaga);
  yield takeEvery(UPDATE_FAVOURITES, updateFavouritesSaga);
  yield takeEvery(UPDATE_WATCHLIST, updateWatchlistSaga);
  yield takeEvery(SET_SEARCH_QUERY, searchFilms);
  yield takeEvery(SET_SEARCH_PAGE, searchFilms);
}
