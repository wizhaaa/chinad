import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Cart from "./Pages/Cart";
import Menu from "./Pages/Menu";
import LunchSpecials from "./MenuPages/LunchSpecials";
import Soups from "./MenuPages/Soups";
import DinnerCombo from "./MenuPages/DinnerCombo";

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
        <Route exact path="/soups" component={Soups} />
        <Route exact path="/dinner-combo" component={DinnerCombo} />
      </Switch>
    </div>
  );
};

export default Routes;
