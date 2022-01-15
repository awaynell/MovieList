import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedYear, setSortValue, setYearsStarting } from "../../../../../redux/actionCreators";
import { selectedYear, sortValue, years } from "../../../../../redux/selectors";
import { MenuProps } from "../Genres/Genres";
import "./SortBy.scss";

const SortBy = React.memo(() => {
  const dispatch = useDispatch();

  const sortBy = useSelector(sortValue);
  const yearsArr = useSelector(years);
  const year = useSelector(selectedYear);
  console.log("year: ", year);

  const saveSortValue = (event: SelectChangeEvent<any>) => {
    dispatch(setSortValue(event.target.value));
  };

  const saveSelectedYear = (event: SelectChangeEvent<any>) => {
    if (event.target.value === "Без года") {
      dispatch(setSelectedYear(""));
    } else {
      dispatch(setSelectedYear(event.target.value));
    }
  };

  useEffect(() => {
    dispatch(setYearsStarting());
  }, []);

  return (
    <Box>
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
      <FormControl sx={{ pl: 1.5, m: 1, width: "19.7vw" }}>
        <InputLabel id='demo-simple-select-autowidth-label' sx={{ pl: 2, width: "100%" }}>
          Год релиза
        </InputLabel>
        {yearsArr.length !== 0 && (
          <Select
            labelId='demo-simple-select-autowidth-label1'
            id='demo-simple-select-autowidth1'
            defaultValue={"Без года"}
            label='Год релиза'
            onChange={saveSelectedYear}
            sx={{ backgroundColor: "#57595b" }}
            MenuProps={MenuProps}
          >
            <MenuItem key={year} value={"Без года"}>
              <em>Без года</em>
            </MenuItem>
            {yearsArr.map((year: number) => {
              return (
                <MenuItem key={year} value={`${year}`}>
                  <em>{year}</em>
                </MenuItem>
              );
            })}
          </Select>
        )}
      </FormControl>
    </Box>
  );
});

export default SortBy;
