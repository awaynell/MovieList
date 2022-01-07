import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useData } from "../../../../../hooks/useData";
import { removeGenre, addGenre, setPage } from "../../../../../redux/actionCreators";
import { RESET_GENRES } from "../../../../../redux/actionTypes";
import "./Genres.scss";
import ResetGenresButton from "./ResetGenresButton";

const Genres = () => {
  const [data, loading, error] = useData("genre/movie/list", {
    language: "ru-RU",
  });

  const dispatch = useDispatch();

  const [genresName, setGenresName] = useState<string[]>([]);
  const [genres, setGenres] = useState<any>([]);

  const ITEM_HEIGHT = 408;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT,
        width: 250,
      },
    },
  };

  const handleChange = (event: SelectChangeEvent<typeof genresName>) => {
    const {
      target: { value },
    } = event;
    setGenresName(typeof value === "string" ? value.split(",") : value);
  };

  const addGenreToState = (id: number) => {
    console.log(id);
    let newArray = [...genres, id];
    if (genres.includes(id)) {
      newArray = newArray.filter((genreID) => genreID !== id);
      dispatch(removeGenre(newArray));
    }
    setGenres(newArray);
    dispatch(addGenre(newArray));
  };

  const resetGenres = () => {
    console.log("resetGenres work");
    dispatch({ type: RESET_GENRES });
    setGenresName([]);
    setGenres([]);
  };

  return (
    <>
      {data.length === 0 ? (
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
            <InputLabel sx={{ color: "#939597" }} id='demo-multiple-checkbox-label'>
              Жанры
            </InputLabel>
            <Select
              labelId='demo-multiple-checkbox-label'
              id='demo-multiple-checkbox'
              multiple
              value={genresName}
              onChange={handleChange}
              sx={{ backgroundColor: "#57595b" }}
              input={<OutlinedInput label='Жанры' sx={{ color: "red !important", border: "1px solid green" }} />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, color: "red" }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} sx={{ color: "#363945", backgroundColor: "#E0B589" }} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {data.genres.map((genre: any) => {
                return (
                  <MenuItem key={genre.id} value={genre.name} onClick={() => addGenreToState(genre.id)}>
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
