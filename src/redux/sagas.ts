import { all, call, put, takeEvery } from "redux-saga/effects";
import { ADD_GENRE, REMOVE_GENRE, RESET_GENRES } from "./actionTypes";

export function* resetGenresSaga() {
  console.log("resetGenresSaga work");
}

export function* rootSaga() {
  yield takeEvery(ADD_GENRE, resetGenresSaga);
}
