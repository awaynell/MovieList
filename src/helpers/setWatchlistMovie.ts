import { getSessionIDFromCookie } from "./authHelpers/getSessionIDFromCookie";
import { endpoint } from "../API/apiInfo";

export const setWatchlistMovie = async (userID: string, movieID: number, watched: boolean) => {
  const URL = `${endpoint}account/${userID}/watchlist?${
    "api_key=" + process.env.REACT_APP_API_KEY
  }&session_id=${getSessionIDFromCookie().value}`;

  const bodyResponse = {
    media_type: "movie",
    media_id: movieID,
    watchlist: !watched,
  };

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(bodyResponse),
  });
  const result = await response.json();
};
