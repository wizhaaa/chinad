import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./Home";
import About from "./About";
import Cart from "./Cart";
import Menu from "./Menu";
import LunchSpecials from "./menuComponents/LunchSpecials";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/menu" component={Menu} />

        {/* menu list */}
        <Route exact path="/lunch" component={LunchSpecials} />
      </Switch>
    </div>
  );
};

export default Routes;
