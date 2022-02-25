import { createTheme } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export const theme = createTheme({
  typography: {
    fontFamily: ["Oswald"].join(","),
  },
  palette: {
    primary: {
      main: red[400],
    },
  },
});
