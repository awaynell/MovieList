import { useData } from "./../hooks/useData";
import { all, call, takeEvery } from "redux-saga/effects";
import { apiKey } from "../API/apiKey";

// export function* sagaGetData(useData: any) {
//   const [data, loading, error] = yield call(
//     useData("/trending/movie/day", {
//       api_key: apiKey,
//       language: "ru-RU",
//     })
//   );
// }

export function* rootSaga() {
  yield all([]);
}
