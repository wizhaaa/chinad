import {createMuiTheme} from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Helvetica Neue',  acumin-pro, Merriweather, Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',sans-serif",
    h1: {
      color: "#B18944",
      fontWeight: "bold",
      fontFamily: "Hogback",
      fontSize: "8.5rem",
    },
    h2: {
      color: "#B18944",
      fontWeight: "bold",
      fontFamily: "Hogback",
      fontSize: "7rem",
    },
    h3: {
      color: "#B18944",
      fontWeight: "bold",
      fontFamily: "Hogback",
      fontSize: "5.5rem",
    },
    h4: {
      color: "#B18944",
      fontWeight: "bold",
      fontFamily: "Hogback",
      fontSize: "3rem",
    },
  },
  palette: {
    background: {
      default: "",
    },
    primary: {
      main: "#B41E22",
    },
    secondary: {
      main: "#B18944",
    },
    text: {
      secondary: "#5e5e5e",
    },
  },
  // add attribute to palette for dark mode: type: "dark",
  transitions: {
    // So we have `transition: none;` everywhere
    create: () => "none",
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
      },
      },
    },
  },
});

export default theme;
