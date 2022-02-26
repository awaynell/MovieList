import { getSessionIDFromCookie } from "./getSessionIDFromCookie";
import { endpoint, apiKey } from "../../API/apiInfo";
import { deleteUserInfo } from "../../redux/actionCreators";

export const logout = () => {
  const sessionID = getSessionIDFromCookie().value;
  console.log(sessionID);
  const URL = `${endpoint}/authentication/session?${"api_key=" + apiKey}`;
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
