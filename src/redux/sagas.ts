import { takeEvery } from "redux-saga/effects";
import { TEST_ACTION } from "./actionTypes";

export function* rootSaga() {
  yield takeEvery(TEST_ACTION, () => {
    console.log("saga working");
  });
}
