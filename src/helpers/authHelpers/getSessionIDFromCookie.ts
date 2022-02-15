export const getSessionIDFromCookie = () => {
  let cookie: { key: string; value: string } = { key: "", value: "" };
  document.cookie.split(";").forEach(function (el) {
    let [key, value]: Array<string> = el.split("=");
    cookie = { key: key, value: value };
  });
  return cookie;
};
