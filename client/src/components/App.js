import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import Home from "./Home";
import About from "./About";
import HeaderNav from "./HeaderNav";
import Cart from "./Cart";
import Menu from "./Menu";

//import test module
import Demo from "./demo";

//import "bootstrap";
//import "fontsource-roboto";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />

      <Router>
        <div className="App">
          <HeaderNav />
          <div className={("content", classes.content)}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/menu">
                <Menu />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
