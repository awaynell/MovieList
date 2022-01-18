import { Button, FormControl, Grow, Input, InputLabel, Modal, OutlinedInput, Slide, TextField, Typography } from "@mui/material";
import { Box, style } from "@mui/system";
import "./LoginModal.scss";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../../theme/theme";
import { useDispatch, useSelector } from "react-redux";
import { isShowModal } from "../../../redux/selectors";
import { IS_SHOW_MODAL } from "../../../redux/actionTypes";

const LoginModal = () => {
  const showModal = useSelector(isShowModal);
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Modal
          keepMounted
          open={showModal}
          onClose={() => dispatch({ type: IS_SHOW_MODAL, payload: false })}
          aria-labelledby='keep-mounted-modal-title'
          aria-describedby='keep-mounted-modal-description'
          sx={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <Grow in={showModal}>
            <Box
              sx={{
                backgroundColor: "#282d3c",
                boxShadow: "1px 3px 34px 4px rgba(34, 60, 80, 0.2)",
                display: "flex",
                flexDirection: "column",
                p: 20,
                width: "20vw",
                borderRadius: "10px",
              }}
            >
              <TextField id='filled-basic' label='Login' variant='filled' margin='dense' />
              <TextField id='filled-basic' label='Password' variant='filled' type='password' margin='dense' />
              <Button variant='outlined' sx={{ mt: 1 }}>
                Войти
              </Button>
            </Box>
          </Grow>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default LoginModal;
