import { TEST_ACTION } from "./actionTypes";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  text: "",
};

export const testReducer = (state: { text: string } = initialState, action: PayloadAction<any>) => {
  switch (action.type) {
    case TEST_ACTION:
      return {...state, text: "Redux working"};
    default:
      return state;
  }
};
