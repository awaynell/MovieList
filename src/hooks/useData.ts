import { setDataAction } from "./../redux/actionCreators";
import { useDispatch } from "react-redux";
import { endpoint } from "./../API/apiKey";
import { useEffect, useState } from "react";
import * as queryString from "query-string";

export const useData = (route: string, query: any) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const URL = `${endpoint}${route}?${queryString.stringify(query)}`;
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = () => {
      setLoading(true);
      fetch(URL)
        .then((data) => data.json())
        .then((json) => {
          setData(json);
          dispatch(setDataAction(json));
        })
        .catch(() => setError(true));
      setLoading(false);
    };
    getData();
    console.log("use data work");
  }, [URL]);

  return [data, loading, error] as const;
};
