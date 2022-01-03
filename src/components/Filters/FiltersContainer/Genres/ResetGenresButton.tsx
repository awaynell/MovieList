import { Tooltip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { resetGenres } from "../../../../redux/actionCreators";
import { RESET_GENRES } from "../../../../redux/actionTypes";
import { FC } from "react";
import { AnyCnameRecord } from "dns";

interface ResGenBtn {
  resetGenres: any;
}

const ResetGenresButton: FC<ResGenBtn> = ({ resetGenres }) => {
  return (
    <Tooltip title='Сбросить жанры'>
      <IconButton onClick={resetGenres}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ResetGenresButton;
