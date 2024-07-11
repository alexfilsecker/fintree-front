import { ThemeProvider } from "@mui/material";
import { type AppProps } from "next/app";

import Layout from "@/components/layout";
import theme from "@/style/theme";
import "../style/global.css";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
