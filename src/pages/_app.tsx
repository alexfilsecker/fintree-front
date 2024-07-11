import { ThemeProvider } from "@mui/material";
import { type AppProps } from "next/app";
import { Provider } from "react-redux";

import Layout from "@/components/layout";
import theme from "@/style/theme";
import "../style/global.css";

import store from "../redux/store";

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
