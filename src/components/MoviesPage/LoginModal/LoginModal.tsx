import {
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  Grow,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  Modal,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import "./LoginModal.scss";
import { theme } from "../../../theme/theme";
import { useDispatch, useSelector } from "react-redux";
import { isShowModal } from "../../../redux/selectors";
import { ADD_USERINFO, IS_SHOW_MODAL } from "../../../redux/actionTypes";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { getUser } from "../../../helpers/authHelpers/getUser";

const LoginModal = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const showModal = useSelector(isShowModal);
  const dispatch = useDispatch();

  const [authValue, setAuthValue] = React.useState({
    login: "",
    password: "",
    showPassword: false,
  });

  const getUserInfo = async () => {
    if (authValue.login.length === 0 || authValue.password.length === 0) {
      return false;
    }
    setLoading(true);
    const responseUserInfo = await getUser(authValue.login, authValue.password);
    if (responseUserInfo) {
      if (responseUserInfo.error) {
        setError(responseUserInfo.statusMessage);
      } else {
        dispatch({ type: ADD_USERINFO, payload: responseUserInfo.userInfo });
        dispatch({ type: IS_SHOW_MODAL, payload: false });
      }
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
    <Box>
      <Modal
        className='loginModal-wrapper'
        keepMounted
        open={showModal}
        onClose={() => dispatch({ type: IS_SHOW_MODAL, payload: false })}
        aria-labelledby='keep-mounted-modal-title'
        aria-describedby='keep-mounted-modal-description'>
        <Grow in={showModal}>
          <Box className='loginModal-content'>
            <Typography sx={{ width: "100%", textAlign: "center" }}>
              ???? ???????????? ??????????, ???????? ?? ?????? ???????? ?????????????? ???? TheMovieDB
            </Typography>
            <Box
              component='form'
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <FormControl sx={{ width: "100%", mt: 1 }} required>
                <InputLabel sx={{ mt: 1 }}>Login</InputLabel>
                <FilledInput margin='dense' onChange={handleChange("login")} required />
              </FormControl>
              <FormControl sx={{ width: "100%", mt: 1, backgroundColor: "transparent" }} required>
                <InputLabel sx={{ mt: 1 }}>Password</InputLabel>
                <FilledInput
                  type={authValue.showPassword ? "text" : "password"}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position='end' sx={{ pl: 4 }}>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        edge='end'>
                        {authValue.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                  required
                />
              </FormControl>
              {loading ? (
                <LinearProgress sx={{ mt: 1, width: "50%" }} />
              ) : (
                <Button
                  type='submit'
                  variant='outlined'
                  sx={{ mt: 1, width: "50%" }}
                  onClick={getUserInfo}>
                  ??????????
                </Button>
              )}
            </Box>
            {error.length !== 0 && <Typography>{error}</Typography>}
          </Box>
        </Grow>
      </Modal>
    </Box>
  );
};

export default LoginModal;
