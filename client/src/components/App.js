// react library
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// material-ui library
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

// self made components
import HeaderNav from "./HeaderNav";
import Routes from "./Routes";

//import test module
import Zz from "./demonr";

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
      <Zz />
      <CssBaseline />

      <Router>
        <div className="App">
          {/* <HeaderNav /> */}

          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Routes />
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;
