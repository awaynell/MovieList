import { ThemeProvider } from "@mui/system";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Layout from "./Layout/Layout";
import { store } from "./redux";
import { theme } from "./theme/theme";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Layout>
          <App />
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);
