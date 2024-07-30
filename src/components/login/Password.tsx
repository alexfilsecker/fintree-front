import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";

type PasswordInputProps = {
  password: string;
  setPassword: (_: string) => void;
  error: string | null;
};

const PasswordInput = ({
  password,
  setPassword,
  error,
}: PasswordInputProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (): void => {
    setShowPassword((show) => !show);
  };

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="password-input" error={error !== null}>
        Password
      </InputLabel>
      <OutlinedInput
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        label="Password"
        id="password-input"
        type={showPassword ? "text" : "password"}
        error={error !== null}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText error={error !== null}>{error}</FormHelperText>
    </FormControl>
  );
};

export default PasswordInput;
