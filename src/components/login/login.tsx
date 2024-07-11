import {
  Paper,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";

import PasswordInput from "./password";

import { useAppDispatch, useAppSelector } from "@/hooks/state";
import login from "@/redux/slices/auth/authActions";

const Login = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginError, loginLoading } = useAppSelector((state) => state.auth);

  const errorInPassword = loginError !== null && loginError.in === "password";
  const errorInUsername = loginError !== null && loginError.in === "username";

  const dispatch = useAppDispatch();

  const handleLogin = (): void => {
    void dispatch(login({ username, password }));
  };

  return (
    <Paper className="p-10" elevation={10}>
      <div className="flex flex-col gap-10">
        <Typography variant="h4" align="center">
          Login
        </Typography>
        <div className="flex flex-col gap-3">
          <TextField
            label="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            error={errorInUsername}
            helperText={errorInUsername ? loginError.message : undefined}
          />
          <PasswordInput
            password={password}
            setPassword={setPassword}
            error={errorInPassword ? loginError.message : null}
          />
        </div>
        {loginLoading ? (
          <div className="w-full flex justify-center">
            <CircularProgress />
          </div>
        ) : (
          <Button
            variant="outlined"
            onClick={handleLogin}
            disabled={password.length === 0 || username.length === 0}
          >
            Login
          </Button>
        )}
      </div>
    </Paper>
  );
};

export default Login;
