import { Button, FilledInput, FormControl, Grow, IconButton, InputAdornment, InputLabel, LinearProgress, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import "./LoginModal.scss";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../../theme/theme";
import { useDispatch, useSelector } from "react-redux";
import { isShowModal } from "../../../redux/selectors";
import { ADD_USERINFO, IS_SHOW_MODAL } from "../../../redux/actionTypes";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { getUser } from "../../../helpers/authHelpers/getUser";

const LoginModal = () => {
  const [userInfo, setUserInfo] = useState<any>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const showModal = useSelector(isShowModal);
  const dispatch = useDispatch();

  console.log("userInfo: ", userInfo);
  const [authValue, setAuthValue] = React.useState({
    login: "",
    password: "",
    showPassword: false,
  });

  const getUserInfo = async () => {
    setLoading(true);
    const responseUserInfo = await getUser(authValue.login, authValue.password);
    if (responseUserInfo) {
      responseUserInfo.error ? setError(responseUserInfo.statusMessage) : dispatch({ type: ADD_USERINFO, payload: responseUserInfo.userInfo });
      setLoading(false);
    }
  };

  const handleChange = (prop: any) => (event: any) => {
    setAuthValue({ ...authValue, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setAuthValue({
      ...authValue,
      showPassword: !authValue.showPassword,
    });
  };

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
                alignItems: "center",
                justifyContent: "center",
                width: "30vw",
                height: "50vh",
                borderRadius: "10px",
                p: 10,
              }}
            >
              <Typography sx={{ width: "100%", textAlign: "center" }}>Вы можете войти, если у вас есть аккаунт на TheMovieDB</Typography>
              <FormControl sx={{ width: "100%", mt: 1 }}>
                <InputLabel sx={{ mt: 1 }}>Login</InputLabel>
                <FilledInput margin='dense' onChange={handleChange("login")} />
              </FormControl>
              <FormControl sx={{ width: "100%", mt: 1 }}>
                <InputLabel sx={{ mt: 1 }}>Password</InputLabel>
                <FilledInput
                  type={authValue.showPassword ? "text" : "password"}
                  value={authValue.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} edge='end'>
                        {authValue.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {loading ? (
                <LinearProgress sx={{ mt: 1, width: "50%" }} />
              ) : (
                <Button variant='outlined' sx={{ mt: 1 }} onClick={getUserInfo}>
                  Войти
                </Button>
              )}
              {error.length !== 0 && <Typography>{error}</Typography>}
            </Box>
          </Grow>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default LoginModal;