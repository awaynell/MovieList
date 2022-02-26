import { getUser, getUserInfo } from "./../helpers/authHelpers/getUser";
import { put, take, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";
import { getYears } from "../helpers/getYears";
import {
  ADD_GENRE,
  ADD_USERINFO,
  ADD_USERINFO_START,
  DELETE_USERINFO,
  REMOVE_GENRE,
  RESET_GENRES,
  SET_YEARS,
  SET_YEARS_START,
  UPDATE_FAVOURITES,
  UPDATE_WATCHLIST,
} from "./actionTypes";
import * as Effects from "redux-saga/effects";
import { setFavouritesMovies, setWatchlist, setYears } from "./actionCreators";
import { logout } from "../helpers/authHelpers/logout";
import { getSessionIDFromCookie } from "../helpers/authHelpers/getSessionIDFromCookie";
import { PayloadAction } from "@reduxjs/toolkit";
import { apiKey } from "../API/apiInfo";
import { useData } from "../hooks/useData";
import { AnyCnameRecord } from "dns";
import { getFavouriteMovies } from "../helpers/getFavouriteMovies";
import { setFavouriteFilm } from "../helpers/setFavouriteFilm";
import { setWatchlistMovie } from "../helpers/setWatchlistMovie";
import { getWatchlist } from "../helpers/getWatchlist";

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
  console.log("updateFavouritesSaga");
  yield call(setFavouriteFilm, action.payload.userID, action.payload.movieID, action.payload.isFavourite);
  const favouriteMovies: { results: [] } = yield call(getFavouriteMovies, action.payload.userID, {
    language: "ru-RU",
  });
  const res = favouriteMovies.results.map((item: { id: number }) => item.id);
  yield put(setFavouritesMovies(res));
}

function* updateWatchlistSaga(action: any) {
  yield call(setWatchlistMovie, action.payload.userID, action.payload.movieID, action.payload.isWatched);
  const watchlistMovies: { results: [] } = yield call(getWatchlist, action.payload.userID, {
    language: "ru-RU",
  });
  const res = watchlistMovies.results.map((item: { id: number }) => item.id);
  yield put(setWatchlist(res));
}

function* userLogoutSaga() {
  yield call(logout);
}

export function* rootSaga() {
  yield takeLeading(SET_YEARS_START, getYearsSaga);
  yield takeEvery(DELETE_USERINFO, userLogoutSaga);
  yield takeEvery(ADD_USERINFO_START, getUserFromCookieSaga);
  yield takeEvery(UPDATE_FAVOURITES, updateFavouritesSaga);
  yield takeEvery(UPDATE_WATCHLIST, updateWatchlistSaga);
}
