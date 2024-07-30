import { ThemeProvider } from "@mui/material";
import { type AppProps } from "next/app";
import { Provider } from "react-redux";

import store from "../redux/store";

import Layout from "@/components/Layout";
import theme from "@/style/theme";
import "../style/global.css";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ThemeProvider>
  );
};

export default MyApp;
