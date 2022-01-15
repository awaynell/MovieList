import { put, takeLeading } from "redux-saga/effects";
import { getYears } from "../helpers/getYears";
import { ADD_GENRE, REMOVE_GENRE, RESET_GENRES, SET_YEARS, SET_YEARS_START } from "./actionTypes";
import * as Effects from "redux-saga/effects";
import { setYears } from "./actionCreators";

const call: any = Effects.call;

export function* getYearsSaga() {
  const years: Array<number> = yield call(getYears);
  yield put({ type: SET_YEARS, payload: years.reverse() });
}

export function* rootSaga() {
  yield takeLeading(SET_YEARS_START, getYearsSaga);
}
