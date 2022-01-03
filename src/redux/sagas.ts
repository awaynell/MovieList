import { all, call, put, takeEvery } from "redux-saga/effects";
import { RESET_GENRES } from "./actionTypes";

export function* resetGenresSaga() {
  yield put({ type: RESET_GENRES, payload: [] });
}

export function* rootSaga() {
  console.log("rootSaga work");
  yield takeEvery(RESET_GENRES, resetGenresSaga);
}
