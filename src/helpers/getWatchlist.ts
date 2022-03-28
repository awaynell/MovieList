import { getSessionIDFromCookie } from "./authHelpers/getSessionIDFromCookie";
import { endpoint, apiKey } from "../API/apiInfo";
import * as queryString from "query-string";

export const getWatchlist = async (userID: number, query: {}) => {
  const URL = `${endpoint}/account/${userID}/watchlist/movies?${"api_key=" + apiKey}&session_id=${
    getSessionIDFromCookie().value
  }&${queryString.stringify(query)}`;

  const response = await fetch(URL);
  const data = await response.json();

  if (data.total_pages > 1) {
    const responses = await Promise.all(
      Array.from(Array(data.total_pages), (_, i) =>
        fetch(
          `${endpoint}/account/${userID}/watchlist/movies?${"api_key=" + apiKey}&session_id=${
            getSessionIDFromCookie().value
          }&${queryString.stringify({ ...query, page: Number(i + 1) })}`,
        ).then((data) => data.json()),
      ),
    );
    const results: any[] = [];
    const arr = responses.map((resp: any) => results.push(...resp.results));
    return results;
  }

  return data.results;
};
