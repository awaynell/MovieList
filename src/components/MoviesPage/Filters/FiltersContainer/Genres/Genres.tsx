import React from "react";
import { Box, Chip, FormControl, ListItemText, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { red } from "@mui/material/colors";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useData } from "../../../../../hooks/useData";
import { removeGenre, addGenre } from "../../../../../redux/actionCreators";
import { RESET_GENRES } from "../../../../../redux/actionTypes";
import "./Genres.scss";
import ResetGenresButton from "./ResetGenresButton";
import { selectedGenres } from "../../../../../redux/selectors";

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 408,
    },
  },
};

export interface Genre {
  id: string;
  genreName: string;
}

const Genres = () => {
  const [data, loading, error] = useData("genre/movie/list", {
    language: "ru-RU",
  });

  const dispatch = useDispatch();

  const [genresName, setGenresName] = useState<string[]>([]);
  const [genres, setGenres] = useState<any>([]);
  const choosedGenres = useSelector(selectedGenres);

  const handleChange = (event: SelectChangeEvent<typeof genresName>) => {
    const {
      target: { value },
    } = event;
    setGenresName(typeof value === "string" ? value.split(",") : value);
  };

  const addGenreToState = (id: string, genreName: string) => {
    let newArray: any = [...choosedGenres];
    newArray = [...choosedGenres, { id: id, genreName: genreName }];
    dispatch(addGenre(newArray));
  };

  const resetGenres = () => {
    dispatch({ type: RESET_GENRES });
    setGenresName([]);
  };

  return (
    <>
      {loading && data ? (
        <div></div>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "0 10px 0 10px",
          }}
        >
          <FormControl sx={{ m: 1, width: "20vw" }}>
            <Select
              multiple
              defaultValue={[""]}
              value={genresName}
              onChange={handleChange}
              sx={{ backgroundColor: "#57595b" }}
              placeholder='genres'
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <div>Жанры</div>;
                }
                return (selected.length = 0);
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value=''>
                Жанры
              </MenuItem>
              {data.genres.map((genre: any) => {
                return (
                  <MenuItem key={genre.id} value={genre.name} onClick={() => addGenreToState(genre.id, genre.name)}>
                    <ListItemText primary={genre.name} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <ResetGenresButton resetGenres={resetGenres} />
        </Box>
      )}
    </>
  );
};

export default Genres;
