import { Paper, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";

import PasswordInput from "./password";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordInput password={password} setPassword={setPassword} />
        </div>
        <Button variant="outlined">Login</Button>
      </div>
    </Paper>
  );
};

export default Login;
