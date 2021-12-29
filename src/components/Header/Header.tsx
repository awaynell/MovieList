import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { theme } from "../../theme/theme";

const Header = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' sx={{ backgroundColor: "#363945", color: "#efe1ce" }}>
          <Toolbar>
            <Typography fontWeight={300} letterSpacing={1.25} variant='h6' component='div' sx={{ flexGrow: 1 }}>
              MOVIE LIST
            </Typography>
            <Button variant='contained' color='error'>
              <Typography fontWeight={400} letterSpacing={1.2} color='#efe1ce'>
                Login
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Header;
