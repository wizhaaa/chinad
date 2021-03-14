import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import NavBarMenu from "./NavBarMenu";
import NavAppBar from "./NavAppBar";
import Cart from "./Cart";

//import "bootstrap";
//import "fontsource-roboto";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />

      <Router>
        <div className="App">
          <NavAppBar />
          {/* <NavBarMenu /> */}
          {/* <Navbar /> */}
          <div className="content">
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
            </Switch>
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
