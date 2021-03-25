import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import orange from "@material-ui/core/colors/orange";

const theme = createMuiTheme({
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, acumin-pro, Merriweather, Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    h1: {
      color: "#E07A5F",
      fontWeight: "bold",
    },
    h2: {
      color: "#E07A5F",
      fontWeight: "bold",
    },
    h3: {
      color: "#E07A5F",
      fontWeight: "bold",
    },
    h4: {
      color: "#E07A5F",
      fontWeight: "bold",
    },
  },
  palette: { type: "dark", primary: red, secondary: orange },
});

export default theme;
