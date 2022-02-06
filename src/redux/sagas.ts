import { getUser } from "./../helpers/authHelpers/getUser";
import { put, takeEvery, takeLeading } from "redux-saga/effects";
import { getYears } from "../helpers/getYears";
import { ADD_GENRE, ADD_USERINFO, ADD_USERINFO_START, REMOVE_GENRE, RESET_GENRES, SET_YEARS, SET_YEARS_START } from "./actionTypes";
import * as Effects from "redux-saga/effects";
import { setYears } from "./actionCreators";

const call: any = Effects.call;

function* getYearsSaga() {
  const years: Array<number> = yield call(getYears);
  yield put({ type: SET_YEARS, payload: years.reverse() });
}
// function* getUserSaga() {
//   const userInfo: object = yield call(getUser);
//   yield put({ type: ADD_USERINFO, payload: userInfo });
// }

export function* rootSaga() {
  yield takeLeading(SET_YEARS_START, getYearsSaga);
  // yield takeEvery(ADD_USERINFO_START, getUserSaga);
}
