import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import Home from "./Home";
import About from "./About";
import HeaderNav from "./HeaderNav";
import Cart from "./Cart";
import Menu from "./Menu";

//import "bootstrap";
//import "fontsource-roboto";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />

      <Router>
        <div className="App">
          <HeaderNav />
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
