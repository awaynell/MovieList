import { getSessionIDFromCookie } from "./authHelpers/getSessionIDFromCookie";
import { endpoint, apiKey } from "../API/apiInfo";
import * as queryString from "query-string";

export const getWatchlist = async (userID: number, query: {}) => {
  const URL = `${endpoint}/account/${userID}/watchlist/movies?${"api_key=" + apiKey}&session_id=${
    getSessionIDFromCookie().value
  }&${queryString.stringify(query)}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};
