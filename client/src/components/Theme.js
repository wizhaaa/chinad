import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import orange from "@material-ui/core/colors/orange";

const theme = createMuiTheme({
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, acumin-pro, Merriweather, Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    h1: {
      color: "orange",
      fontWeight: "bold",
    },
    h2: {
      color: "orange",
      fontWeight: "bold",
    },
    h3: {
      color: "orange",
      fontWeight: "bold",
    },
    h4: {
      color: "orange",
      fontWeight: "bold",
    },
  },
  palette: { type: "dark", primary: red, secondary: orange },
});

export default theme;
