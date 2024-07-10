import { ThemeProvider } from "@mui/material";
import { AppProps } from "next/app";

import theme from "@/style/theme";
import "../style/global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
