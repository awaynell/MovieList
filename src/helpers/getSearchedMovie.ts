import * as queryString from "query-string";
import { endpoint } from "../API/apiInfo";

export const getSearchedMovies = async (query: { query: string }) => {
  if (query.query.length === 0) {
    return;
  }
  const URL = `${endpoint}search/movie/?${
    "api_key=" + process.env.REACT_APP_API_KEY
  }&${queryString.stringify(query)}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};
