import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useData } from "../../../../hooks/useData";
import { addGenre, removeGenre, resetGenres } from "../../../../redux/actionCreators";
import "./Genres.scss";
import ResetGenresButton from "./ResetGenresButton";

const Genres = () => {
  const [data, loading, error] = useData("genre/movie/list", {
    language: "ru-RU",
  });

  const dispatch = useDispatch();

  const [genresName, setGenresName] = useState<string[]>([]);
  const [genres, setGenres] = useState<any>([]);

  const ITEM_HEIGHT = 108;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
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

  const resetGenresHandler = () => {
    dispatch(resetGenres);
    setGenresName([]);
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
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, color: "#efe1ce" }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} sx={{ color: "#efe1ce" }} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {data.genres.map((genre: any) => {
                return (
                  <MenuItem key={genre.id} value={genre.name}>
                    <Checkbox checked={genresName.indexOf(genre.name) > -1} value={genre.name} />
                    <ListItemText primary={genre.name} onClick={() => addGenreToState(genre.id)} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <ResetGenresButton resetGenres={resetGenresHandler} />
        </Box>
      )}
    </>
  );
};

export default Genres;
