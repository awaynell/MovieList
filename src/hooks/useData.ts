import { endpoint } from "../API/apiInfo";
import { useEffect, useState } from "react";
import * as queryString from "query-string";

export const useData = (route: string, query: object) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Array<string>>([]);

  const URL = `${endpoint}${route}?${
    "api_key=" + process.env.REACT_APP_API_KEY
  }&${queryString.stringify(query)}`;

  const getData = async () => {
    setLoading(true);
    const response = await fetch(URL);
    const data = await response.json();
    setData(data);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, [URL]);
  return [data, loading, error] as const;
};
