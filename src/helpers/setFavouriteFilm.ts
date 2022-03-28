import { getSessionIDFromCookie } from "./authHelpers/getSessionIDFromCookie";
import { endpoint } from "../API/apiInfo";

export const setFavouriteFilm = async (userID: string, movieID: number, favourite: boolean) => {
  const URL = `${endpoint}account/${userID}/favorite?${
    "api_key=" + process.env.REACT_APP_API_KEY
  }&session_id=${getSessionIDFromCookie().value}`;

  const bodyResponse = {
    media_type: "movie",
    media_id: movieID,
    favorite: !favourite,
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
