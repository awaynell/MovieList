import React from "react";
import { Button } from "@mui/material";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { testAction } from "./redux/actionCreators";

export const App = () => {
  const dispatch = useDispatch();

  const { text } = useSelector((state: RootStateOrAny) => state);

  return (
    <>
      <Button variant='contained' onClick={() => dispatch(testAction())}>
        test
      </Button>
      <div>{text}</div>
    </>
  );
};

export default App;
