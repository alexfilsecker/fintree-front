import { ThemeProvider } from "@mui/material";
import { AppProps } from "next/app";

import Layout from "@/components/layout";
import theme from "@/style/theme";
import "../style/global.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
