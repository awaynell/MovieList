import React from "react";
import { useSelector } from "react-redux";
import { useData } from "../../../hooks/useData";
import { userInfo } from "../../../redux/selectors";
import { apiKey } from "../../../API/apiInfo";
import { getSessionIDFromCookie } from "../../../helpers/authHelpers/getSessionIDFromCookie";

const FavouriteMovieList = () => {
  const { id } = useSelector(userInfo);
  const [data, loading, error] = useData(`/account/${id}/favorite/movies`, {
    api_key: apiKey,
    session_id: getSessionIDFromCookie().value,
    language: "ru-RU",
  });
  console.log(data);
  return <div>Тут будут любимые фильмы</div>;
};

export default FavouriteMovieList;
