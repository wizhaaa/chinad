import React from "react";
import {Route, Switch} from "react-router-dom";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Cart from "./Pages/Cart";
import OrderConfirmation from "./Pages/OrderConfirmation";
import Menu from "./Pages/Menu";
import LunchSpecials from "./MenuPages/LunchSpecials";
import Soups from "./MenuPages/Soups";
import DinnerCombo from "./MenuPages/DinnerCombo";
import Appetizers from "./MenuPages/Appetizers";
import SweetAndSour from "./MenuPages/SweetAndSour";
import EFY from "./MenuPages/EggFooYoung";
import FR from "./MenuPages/FriedRice";
import LoMein from "./MenuPages/LoMein";
import MeiFun from "./MenuPages/MeiFun";
import ChowMein from "./MenuPages/ChowMein";
import Poultry from "./MenuPages/Poultry";
import Pork from "./MenuPages/Pork";
import Seafood from "./MenuPages/Seafood";
import Beef from "./MenuPages/Beef";
import MuShu from "./MenuPages/MuShu";
import Vegetable from "./MenuPages/Vegetable";
import Udon from "./MenuPages/Udon";
import Chef from "./MenuPages/Chef";
import Diet from "./MenuPages/Diet";
import Side from "./MenuPages/Side";

import AxiosTest from "./AxiosTest";
import MyEmail from "./Pages/MyEmail";
import Admin from "./Pages/Admin";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/menu">
          <Menu />
        </Route>
        {/* menu list */}
        <Route exact path="/lunch">
          <LunchSpecials />
        </Route>
        <Route exact path="/soups">
          <Soups />
        </Route>
        <Route exact path="/dinner-combo">
          <DinnerCombo />
        </Route>
        <Route exact path="/appetizers">
          <Appetizers />
        </Route>
        <Route exact path="/sweet-and-sour">
          <SweetAndSour />
        </Route>
        <Route exact path="/egg-foo-young">
          <EFY />
        </Route>
        <Route exact path="/fried-rice">
          <FR />
        </Route>
        <Route exact path="/lo-mein">
          <LoMein />
        </Route>
        <Route exact path="/mei-fun">
          <MeiFun />
        </Route>
        <Route exact path="/chow-mein">
          <ChowMein />
        </Route>
        <Route exact path="/poultry">
          <Poultry />
        </Route>
        <Route exact path="/pork">
          <Pork />
        </Route>
        <Route exact path="/seafood">
          <Seafood />
        </Route>
        <Route exact path="/beef">
          <Beef />
        </Route>
        <Route exact path="/mu-shu">
          <MuShu />
        </Route>
        <Route exact path="/vegetable">
          <Vegetable />
        </Route>
        <Route exact path="/udon">
          <Udon />
        </Route>
        <Route exact path="/chef">
          <Chef />
        </Route>
        <Route exact path="/diet">
          <Diet />
        </Route>
        <Route exact path="/sides">
          <Side />
        </Route>
        <Route exact path="/axiostest">
          <AxiosTest />
        </Route>
        <Route exact path="/email">
          <MyEmail />
        </Route>
        <Route exact path="/confirmation">
          <OrderConfirmation />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
      </Switch>
    </div>
  );
};

export default Routes;
