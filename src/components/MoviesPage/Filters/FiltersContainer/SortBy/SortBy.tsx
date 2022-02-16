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
    <Box sx={{ width: "20.15vw" }}>
      <FormControl sx={{ pl: 2, width: "100%" }}>
        <InputLabel id='SortBy' sx={{ pl: 2.5, width: "100%" }}>
          Сортировка
        </InputLabel>
        <Select
          labelId='SortSelect'
          id='SortSelect'
          value={sortBy}
          onChange={saveSortValue}
          label='Сортировка'
          sx={{ backgroundColor: "#57595b" }}
          MenuProps={MenuProps}
        >
          <MenuItem value='popularity.desc'>По популярности (по убыванию)</MenuItem>
          <MenuItem value='popularity.asc'>По популярности (по возрастанию)</MenuItem>
          <MenuItem value={"vote_average.desc"}>По рейтингу (по убыванию)</MenuItem>
          <MenuItem value={"vote_average.asc"}>По рейтингу (по возрастанию)</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ pl: 1, m: 1, width: "100%" }}>
        <InputLabel id='YearReleaseLabel' sx={{ pl: 1.25, width: "100%" }}>
          Год релиза
        </InputLabel>
        {yearsArr.length !== 0 && (
          <Select
            labelId='YearReleaseSelect'
            id='YearReleaseSelect'
            defaultValue={"Без года"}
            label='Год релиза'
            onChange={saveSelectedYear}
            sx={{ backgroundColor: "#57595b" }}
            MenuProps={MenuProps}
          >
            <MenuItem key={year} value={"Без года"}>
              Без года
            </MenuItem>
            {yearsArr.map((year: number) => {
              return (
                <MenuItem key={year} value={`${year}`}>
                  {year}
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
