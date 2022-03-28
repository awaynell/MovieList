import { getSessionIDFromCookie } from "./authHelpers/getSessionIDFromCookie";
import { endpoint } from "../API/apiInfo";
import * as queryString from "query-string";

export const getFavouriteMovies = async (
  userID: number,
  query: { language?: string; page: number },
) => {
  const URL = `${endpoint}/account/${userID}/favorite/movies?${
    "api_key=" + process.env.REACT_APP_API_KEY
  }&session_id=${getSessionIDFromCookie().value}&${queryString.stringify(query)}`;

  const response = await fetch(URL);
  const data = await response.json();

  if (data.total_pages > 1) {
    const responses = await Promise.all(
      Array.from(Array(data.total_pages), (_, i) =>
        fetch(
          `${endpoint}/account/${userID}/favorite/movies?${
            "api_key=" + process.env.REACT_APP_API_KEY
          }&session_id=${getSessionIDFromCookie().value}&${queryString.stringify({
            ...query,
            page: Number(i + 1),
          })}`,
        ).then((data) => data.json()),
      ),
    );
    const results: any[] = [];
    const arr = responses.map((resp: any) => results.push(...resp.results));
    return results;
  }
  return data.results;
};
