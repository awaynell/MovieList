import { SET_DATA } from "./actionTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const initialState = {
  data: [],
};

const dataReducer = (state: { data: Array<any> } = initialState, action: PayloadAction<any>) => {
  switch (action.type) {
    case SET_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  data: dataReducer,
});
