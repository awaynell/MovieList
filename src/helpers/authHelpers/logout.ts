import { getSessionIDFromCookie } from "./getSessionIDFromCookie";
import { endpoint } from "../../API/apiInfo";

export const logout = () => {
  const sessionID = getSessionIDFromCookie().value;
  const URL = `${endpoint}/authentication/session?${"api_key=" + process.env.REACT_APP_API_KEY}`;
  fetch(URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      session_id: sessionID,
    }),
  });
  document.cookie = "sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
