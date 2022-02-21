import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../hooks/useData";

interface MoviePageProps {
  movie?: object;
}

const MoviePage: FC<MoviePageProps> = ({ movie }) => {
  const { id } = useParams();
  const [data, loading, error] = useData(`/movie/${id}`, {
    language: "ru-RU",
  });
  console.log(data);
  return <>{!loading && <div>{data.title}</div>} </>;
};

export default MoviePage;
