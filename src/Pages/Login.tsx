import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormControl, IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import compLogo from "../assets/compLogo.png";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atom/user";
import { createAccount, login } from "../api/user";
import CircularProgress from "@mui/material/CircularProgress";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from "../Utils/validators";
import { toast } from "react-toastify";
import { errorFormatter } from "../Utils/formatter";

const defaultTheme = createTheme();

interface LoginData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export default function SignIn() {
  const [_, setUser] = useRecoilState(userState);
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setSignup] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (e: any, field: keyof LoginData) => {
    setLoginData({
      ...loginData,
      [field]: e.target.value,
    });
    // Clear error message when user starts typing
    setErrors({
      ...errors,
      [field]: "",
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Validate email, password, and confirm password
      const emailError = validateEmail(loginData.email);
      const passwordError = validatePassword(loginData.password);
      const confirmPasswordError = isSignup
        ? validateConfirmPassword(
            loginData.password,
            loginData.confirmPassword || ""
          )
        : "";

      if (emailError || passwordError || confirmPasswordError) {
        // If there are validation errors, set the errors state
        setErrors({
          email: emailError || "",
          password: passwordError || "",
          confirmPassword: confirmPasswordError || "",
        });
        setLoading(false);
        return;
      }

      let payload: LoginData = {
        email: loginData?.email,
        password: loginData?.password,
      };

      if (isSignup) {
        payload = {
          ...payload,
          confirmPassword: loginData?.confirmPassword,
        };
      }
      let { data } = isSignup
        ? await createAccount(payload)
        : await login(payload);

      setUser(data?.data);
    } catch (error) {
      toast.error(errorFormatter(error));
    }
    setLoading(false);
  };

  return (
    <>
      <div className="board-form-container">
        <div className="card">
          <div className="form">
            <div className="left-side left-side-login">
              <div className="h-[100%] flex justify-center items-center flex-col">
                <p className="text-[white] mb-[10px]">Welcome to</p>
                <img src={compLogo} alt="Logo" width={"250"} />
              </div>
            </div>
            <div className="right-side">
              <div className={`main ${true ? "active" : ""}`}>
                <ThemeProvider theme={defaultTheme}>
                  <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                      sx={{
                        marginTop: 7,
                        display: "flex",
                        flexDirection: "column",
                        // alignItems: "center",
                      }}
                    >
                      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                        {!isSignup ? "Sign In" : "Sign Up"}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <TextField
                          variant="standard"
                          margin="normal"
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          autoFocus
                          value={loginData.email}
                          onChange={(e) => handleChange(e, "email")}
                          error={!!errors.email}
                          helperText={errors.email}
                        />
                        <div style={{ position: "relative" }}>
                          <FormControl fullWidth variant="standard">
                            <TextField
                              variant="standard"
                              id="standard-adornment-password"
                              label="Password"
                              type={showPassword ? "text" : "password"}
                              error={!!errors.password}
                              helperText={errors.password}
                              value={loginData.password}
                              onChange={(e) => handleChange(e, "password")}
                            />
                          </FormControl>
                          <IconButton
                            sx={{ position: "absolute", right: 0, top: 10 }}
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </div>
                        <div
                          className={`confirm-holder mt-0 ${
                            isSignup ? "expanded" : ""
                          }`}
                        >
                          <FormControl
                            fullWidth
                            variant="standard"
                            sx={{ mt: 0.5 }}
                          >
                            <TextField
                              variant="standard"
                              id="standard-adornment-password"
                              type="password"
                              label="Confirm Password"
                              value={loginData.confirmPassword}
                              onChange={(e) =>
                                handleChange(e, "confirmPassword")
                              }
                              error={!!errors.confirmPassword}
                              helperText={errors.confirmPassword}
                            />
                          </FormControl>
                        </div>

                        <Button
                          disableElevation
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 4, mb: 2 }}
                          onClick={handleSubmit}
                        >
                          {isLoading ? (
                            <>
                              <CircularProgress
                                sx={{ color: "white", mr: 1 }}
                                size={15}
                              />{" "}
                              Submitting...
                            </>
                          ) : (
                            <>{!isSignup ? "Sign In" : "Sign Up"}</>
                          )}
                        </Button>
                        <Grid container>
                          <Grid item>
                            <div
                              className="cursor-pointer text-[15px] text-[#5f5fdb]"
                              onClick={() => {
                                setSignup(!isSignup);
                              }}
                            >
                              {!isSignup
                                ? "Don't have an account? Sign Up"
                                : "Already registered? Sign In"}
                            </div>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Container>
                </ThemeProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
