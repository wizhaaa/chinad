import React from "react";
import {Route, Switch} from "react-router-dom";

// === V2 (now the default) ===
import V2Home from "./Pages/V2Home";
import V2MenuIndex from "./Pages/V2MenuIndex";
import V2Menu from "./Pages/V2Menu";
import V2Cart from "./Pages/V2Cart";
import V2Checkout from "./Pages/V2Checkout";
import V2Confirmation from "./Pages/V2Confirmation";
import V2Mocks from "./Pages/V2Mocks";

// === V3 (alternate ink direction) ===
import V3Home from "./Pages/V3Home";
import V3Menu from "./Pages/V3Menu";

// === V0 — legacy v1 site, now demoted from / to /v0 ===
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
import Graph from "./Utils/Graph";

const Routes = () => {
  return (
    <div>
      <Switch>
        {/* === DEFAULT (formerly v2) === */}
        <Route exact path="/">
          <V2Home />
        </Route>
        <Route exact path="/menu">
          <V2MenuIndex />
        </Route>
        <Route exact path="/cart">
          <V2Cart />
        </Route>
        <Route exact path="/checkout">
          <V2Checkout />
        </Route>
        <Route exact path="/confirmation">
          <V2Confirmation />
        </Route>
        <Route exact path="/mocks">
          <V2Mocks />
        </Route>
        {/* dynamic category page — :category gets passed to V2Menu */}
        <Route exact path="/menu/:category">
          <V2Menu />
        </Route>

        {/* === V3 (alt ink direction) === */}
        <Route exact path="/v3">
          <V3Home />
        </Route>
        <Route exact path="/v3/menu">
          <V3Menu />
        </Route>

        {/* === V0 — legacy v1 site === */}
        <Route exact path="/v0">
          <Home />
        </Route>
        <Route exact path="/v0/home">
          <Home />
        </Route>
        <Route exact path="/v0/about">
          <About />
        </Route>
        <Route exact path="/v0/cart">
          <Cart />
        </Route>
        <Route exact path="/v0/menu">
          <Menu />
        </Route>
        <Route exact path="/v0/lunch">
          <LunchSpecials />
        </Route>
        <Route exact path="/v0/soups">
          <Soups />
        </Route>
        <Route exact path="/v0/dinner-combo">
          <DinnerCombo />
        </Route>
        <Route exact path="/v0/appetizers">
          <Appetizers />
        </Route>
        <Route exact path="/v0/sweet-and-sour">
          <SweetAndSour />
        </Route>
        <Route exact path="/v0/egg-foo-young">
          <EFY />
        </Route>
        <Route exact path="/v0/fried-rice">
          <FR />
        </Route>
        <Route exact path="/v0/lo-mein">
          <LoMein />
        </Route>
        <Route exact path="/v0/mei-fun">
          <MeiFun />
        </Route>
        <Route exact path="/v0/chow-mein">
          <ChowMein />
        </Route>
        <Route exact path="/v0/poultry">
          <Poultry />
        </Route>
        <Route exact path="/v0/pork">
          <Pork />
        </Route>
        <Route exact path="/v0/seafood">
          <Seafood />
        </Route>
        <Route exact path="/v0/beef">
          <Beef />
        </Route>
        <Route exact path="/v0/mu-shu">
          <MuShu />
        </Route>
        <Route exact path="/v0/vegetable">
          <Vegetable />
        </Route>
        <Route exact path="/v0/udon">
          <Udon />
        </Route>
        <Route exact path="/v0/chef">
          <Chef />
        </Route>
        <Route exact path="/v0/diet">
          <Diet />
        </Route>
        <Route exact path="/v0/sides">
          <Side />
        </Route>
        <Route exact path="/v0/axiostest">
          <AxiosTest />
        </Route>
        <Route exact path="/v0/email">
          <MyEmail />
        </Route>
        <Route exact path="/v0/confirmation">
          <OrderConfirmation />
        </Route>
        <Route exact path="/v0/admin">
          <Admin />
        </Route>
        <Route exact path="/v0/graph">
          <Graph />
        </Route>

        {/* === BACK-COMPAT — old /v2 URLs redirect-feel by rendering same component === */}
        <Route exact path="/v2"><V2Home /></Route>
        <Route exact path="/v2/menu"><V2MenuIndex /></Route>
        <Route exact path="/v2/cart"><V2Cart /></Route>
        <Route exact path="/v2/checkout"><V2Checkout /></Route>
        <Route exact path="/v2/confirmation"><V2Confirmation /></Route>
        <Route exact path="/v2/mocks"><V2Mocks /></Route>
        <Route exact path="/v2/menu/:category"><V2Menu /></Route>
      </Switch>
    </div>
  );
};

export default Routes;
