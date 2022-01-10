import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortValue } from "../../../../../redux/actionCreators";
import { sortValue } from "../../../../../redux/selectors";
import { MenuProps } from "../Genres/Genres";
import "./SortBy.scss";

const SortBy = React.memo(() => {
  const dispatch = useDispatch();

  const sortBy = useSelector(sortValue);

  const saveSortValue = (event: SelectChangeEvent<any>) => {
    console.log(event.target.value);
    dispatch(setSortValue(event.target.value));
  };

  return (
    <FormControl sx={{ pl: 1.5, m: 1, width: "19.7vw" }}>
      <InputLabel id='demo-simple-select-autowidth-label' sx={{ pl: 2, width: "100%" }}>
        Сортировка по
      </InputLabel>
      <Select
        labelId='demo-simple-select-autowidth-label'
        id='demo-simple-select-autowidth'
        value={sortBy}
        onChange={saveSortValue}
        label='Сортировка по'
        sx={{ backgroundColor: "#57595b" }}
        MenuProps={MenuProps}
      >
        <MenuItem value='popularity.desc'>
          <em>По популярности (по убыванию)</em>
        </MenuItem>
        <MenuItem value='popularity.asc'>По популярности (по возрастанию)</MenuItem>
        <MenuItem value={"vote_average.desc"}>По рейтингу (по убыванию)</MenuItem>
        <MenuItem value={"vote_average.asc"}>По рейтингу (по возрастанию)</MenuItem>
      </Select>
    </FormControl>
  );
});

export default SortBy;
