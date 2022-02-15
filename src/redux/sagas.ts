import { getUser, getUserInfo } from "./../helpers/authHelpers/getUser";
import { put, take, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";
import { getYears } from "../helpers/getYears";
import { ADD_GENRE, ADD_USERINFO, ADD_USERINFO_START, DELETE_USERINFO, REMOVE_GENRE, RESET_GENRES, SET_YEARS, SET_YEARS_START } from "./actionTypes";
import * as Effects from "redux-saga/effects";
import { setYears } from "./actionCreators";
import { logout } from "../helpers/authHelpers/logout";
import { getSessionIDFromCookie } from "../helpers/authHelpers/getSessionIDFromCookie";

const call: any = Effects.call;

function* getYearsSaga() {
  const years: Array<number> = yield call(getYears);
  yield put({ type: SET_YEARS, payload: years.reverse() });
}

function* getUserFromCookieSaga() {
  const userInfo: object = yield call(getUserInfo, getSessionIDFromCookie().value);
  yield put({ type: ADD_USERINFO, payload: userInfo });
}

function* userLogoutSaga() {
  yield call(logout);
}

export function* rootSaga() {
  yield takeLeading(SET_YEARS_START, getYearsSaga);
  yield takeEvery(DELETE_USERINFO, userLogoutSaga);
  yield takeEvery(ADD_USERINFO_START, getUserFromCookieSaga);
}
