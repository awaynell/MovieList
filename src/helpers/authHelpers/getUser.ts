import { getSessionIDFromCookie } from "./getSessionIDFromCookie";
import { endpoint } from "../../API/apiInfo";

export const getUser = async (username: string, password: string) => {
  if (getSessionIDFromCookie().value !== undefined) {
    const userInfo = await getUserInfo(getSessionIDFromCookie().value);
  }
  if (username.length === 0 || password.length === 0) {
    return false;
  }
  const URL = `${endpoint}/authentication/token/new?${"api_key=" + process.env.REACT_APP_API_KEY}`;
  const requestValue = await fetch(URL)
    .then((data) => data.json())
    .then((json) => json);
  if (requestValue.success) {
    const userRequestTokenAuthValue = await getRequestTokenUser(
      username,
      password,
      requestValue.request_token,
    );
    if (!userRequestTokenAuthValue.error) {
      const userRequestSessionID = await getSessionIDUser(userRequestTokenAuthValue.requestToken);
      const userInfo = await getUserInfo(userRequestSessionID);
      return { error: false, statusMessage: "", userInfo: userInfo };
    } else {
      return { error: true, statusMessage: userRequestTokenAuthValue.statusMessage, userInfo: {} };
    }
  }
};

const getRequestTokenUser = async (username: string, password: string, requestToken: string) => {
  const URL = `${endpoint}/authentication/token/validate_with_login?${
    "api_key=" + process.env.REACT_APP_API_KEY
  }`;
  const body = {
    username: username,
    password: password,
    request_token: requestToken,
  };
  const requestUser = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  });
  const requestUserResult = await requestUser.json();
  if (requestUserResult.success) {
    return { error: false, requestToken: requestUserResult.request_token };
  } else {
    return { error: true, statusMessage: requestUserResult.status_message };
  }
};

const getSessionIDUser = async (requestToken: string) => {
  const URL = `${endpoint}/authentication/session/new?${
    "api_key=" + process.env.REACT_APP_API_KEY
  }`;
  const body = {
    request_token: requestToken,
  };
  const requestSessionIDUser = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  });

  const sessionID = await requestSessionIDUser.json();
  if (sessionID.success) {
    document.cookie = `sessionID=${sessionID.session_id}`;
    return sessionID.session_id;
  } else {
  }
};

export const getUserInfo = async (sessionID: string) => {
  const URL = `${endpoint}/account?${"api_key=" + process.env.REACT_APP_API_KEY}&${
    "session_id=" + sessionID
  }`;
  const userInfo = await fetch(URL)
    .then((data) => data.json())
    .then((json) => {
      return json;
    });
  return userInfo;
};
