import { Paper, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";

import PasswordInput from "./password";

import { useAppDispatch } from "@/hooks/state";
import login from "@/redux/slices/auth/authActions";

const Login = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          />
          <PasswordInput password={password} setPassword={setPassword} />
        </div>
        <Button variant="outlined" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </Paper>
  );
};

export default Login;
