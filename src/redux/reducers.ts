import { ADD_GENRE, REMOVE_GENRE, RESET_GENRES, SET_DATA } from "./actionTypes";
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

const genreInitialState = {
  genres: [],
};

const genreReducer = (state: { genres: Array<any> } = genreInitialState, action: PayloadAction<any>) => {
  switch (action.type) {
    case ADD_GENRE:
      return { ...state, genres: action.payload };
    case REMOVE_GENRE:
      return { ...state };
    case RESET_GENRES:
      return { ...state, genres: action.payload };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  data: dataReducer,
  genres: genreReducer,
});
