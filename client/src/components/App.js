// react library
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// material-ui library
import {
  makeStyles,
  ThemeProvider,
  CssBaseline,
  Container,
  useMediaQuery,
  createMuiTheme,
} from "@material-ui/core/";

//helmet & meta tags
import { Helmet } from "react-helmet";

// self made components
import HeaderNav from "./HeaderNav";
import Routes from "./Routes";
import theme from "./Theme";
import "./App.css";

//Context Provider
import { CartProvider } from "./CartContext";

//import test module
import Test from "./DemoTestModule";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    maxWidth: "960px",
    paddingBottom: theme.spacing(20),
  },
}));

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  // const theme = React.useMemo(
  //   () =>
  //     createMuiTheme({
  //       palette: {
  //         type: prefersDarkMode ? "dark" : "light",
  //       },
  //     }),
  //   [prefersDarkMode]
  // );
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="China Delight Chinese Restaurant, Forest Hill, MD，Chinese Food, Fast delivery, Online coupon, Restaurant Review, Take Out, Eat in, Dine in, Online, Order, Online Order, Menu, Maryland, Harford County"
        />
        <meta
          name="description"
          content="China Delight Chinese Restaurant based in Forest Hill, MD. We do dine-in, carryout, and online orders!"
        />
        {/* <meta name="author" content="Will Zhang" />
        <a href="https://www.chinadelightmd.com/menu"> Menu </a>
        <a href="https://www.chinadelightmd.com/dinner-combo"> Dinner </a>
        <a href="https://www.chinadelightmd.com/chef"> Specials </a>
        <a href="https://www.chinadelightmd.com/sides"> Sides </a>
        <a href="https://www.chinadelightmd.com/appetizers">
          {" "}
          Appetizers{" "}
        </a>{" "} */}
        <title> China Delight - Forest Hill MD </title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <Router>
          {/* <Test /> */}
          <CartProvider>
            <HeaderNav />
            <CssBaseline />

            <div className="App">
              <main className={classes.content}>
                <div className={classes.toolbar} />
                <Routes />{" "}
              </main>
            </div>
          </CartProvider>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
