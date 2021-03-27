// react library
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// material-ui library
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";

// self made components
import HeaderNav from "./HeaderNav";
import Routes from "./Routes";
import theme from "./Theme";
import "./App.css";
//import test module
import Test from "./DemoTestModule";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Router>
          {/* <Test /> */}
          <HeaderNav />
          <CssBaseline />

          <div className="App">
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Routes />
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;