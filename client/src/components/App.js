// react library
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// material-ui library
import {
  makeStyles,
  ThemeProvider,
  CssBaseline,
  Container,
} from "@material-ui/core/";

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
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
