import { endpoint, apiKey } from "../../API/apiInfo";

export const getUser = async (username: string, password: string) => {
  if (username.length === 0 || password.length === 0) {
    return false;
  }
  const URL = `${endpoint}/authentication/token/new?${"api_key=" + apiKey}`;
  const requestValue = await fetch(URL)
    .then((data) => data.json())
    .then((json) => json);
  if (requestValue.success) {
    const userRequestTokenAuthValue = await getRequestTokenUser(username, password, requestValue.request_token);
    const userRequestSessionID = await getSessionIDUser(userRequestTokenAuthValue);
    console.log("userRequestSessionID: ", userRequestSessionID);
    const userInfo = await getUserInfo(userRequestSessionID);
    return userInfo;
  }
};

const getRequestTokenUser = async (username: string, password: string, requestToken: string) => {
  const URL = `${endpoint}/authentication/token/validate_with_login?${"api_key=" + apiKey}`;
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
    return requestUserResult.request_token;
  } else {
    return requestUserResult.status_message;
  }
};

const getSessionIDUser = async (requestToken: string) => {
  const URL = `${endpoint}/authentication/session/new?${"api_key=" + apiKey}`;
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
    console.log("sessionID.session_id: ", sessionID.session_id);
    return sessionID.session_id;
  } else {
    console.log(sessionID.status_message);
  }
};

const getUserInfo = async (sessionID: string) => {
  const URL = `${endpoint}/account?${"api_key=" + apiKey}&${"session_id=" + sessionID}`;
  const userInfo = await fetch(URL)
    .then((data) => data.json())
    .then((json) => {
      return json;
    });
  return userInfo;
};
