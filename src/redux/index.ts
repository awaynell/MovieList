import { testReducer } from "./reducers";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootSaga } from "./sagas";

const saga = createSagaMiddleware();
export const store = createStore(testReducer, composeWithDevTools(applyMiddleware(saga)));

saga.run(rootSaga);
