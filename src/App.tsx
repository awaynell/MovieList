import React from "react";
import { Button } from "@mui/material";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { testAction } from "./redux/actionCreators";
import { textSelector } from "./redux/selectors";

export const App = () => {
  const dispatch = useDispatch();

  const text = useSelector(textSelector);
  console.log("text: ", text);

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
