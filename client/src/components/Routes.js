import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Cart from "./Pages/Cart";
import Menu from "./Pages/Menu";
import LunchSpecials from "./MenuPages/LunchSpecials";
import Soups from "./MenuPages/Soups";
import DinnerCombo from "./MenuPages/DinnerCombo";

import Test from "./DemoTestModule";
import AxiosTest from "./AxiosTest";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          {" "}
          <Home />{" "}
        </Route>
        <Route exact path="/home">
          {" "}
          <Home />{" "}
        </Route>
        <Route exact path="/about">
          {" "}
          <About />{" "}
        </Route>
        <Route exact path="/cart">
          {" "}
          <Cart />{" "}
        </Route>
        <Route exact path="/menu">
          {" "}
          <Menu />
        </Route>

        {/* menu list */}
        <Route exact path="/lunch">
          {" "}
          <LunchSpecials />{" "}
        </Route>
        <Route exact path="/soups">
          <Soups />{" "}
        </Route>
        <Route exact path="/dinner-combo">
          {" "}
          <DinnerCombo />{" "}
        </Route>
        <Route exact path="/test">
          {" "}
          <Test />{" "}
        </Route>
        <Route exact path="/axiostest">
          {" "}
          <AxiosTest />{" "}
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
