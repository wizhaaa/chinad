// react library
import React from "react";
import {BrowserRouter as Router, useLocation} from "react-router-dom";
// material-ui library
import {makeStyles, ThemeProvider, CssBaseline} from "@material-ui/core/";

//helmet & meta tags
import {Helmet} from "react-helmet";

// self made components
import HeaderNav from "./HeaderNav";
import Routes from "./Routes";
import V2FloatingCart from "./Pages/V2FloatingCart";
import theme from "./Theme";
import "./App.css";

//Context Provider
import {CartProvider} from "./CartContext";

// react google analytics
import ReactGA from "react-ga";
const TRACKING_ID = "G-9RK4LGZH98";
ReactGA.initialize(TRACKING_ID);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    diplay: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    paddingBottom: theme.spacing(20),
  },
}));

function AppShell() {
  const classes = useStyles();
  const {pathname} = useLocation();
  // v0 is the legacy v1 site — keep its drawer chrome.
  // Everything else (default routes + /v2/* + /v3/*) is chromeless.
  const isLegacy = pathname.startsWith("/v0");

  if (!isLegacy) {
    return (
      <>
        <CssBaseline />
        <main style={{width: "100%"}}>
          <Routes />
        </main>
        <V2FloatingCart />
      </>
    );
  }

  return (
    <>
      <HeaderNav />
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes />
      </main>
    </>
  );
}

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="China Delight Chinese Restaurant, Forest Hill, MD，Chinese Food, Fast delivery, Online coupon, Restaurant Review, Take Out, Eat in, Dine in, Online, Order, Online Order, Menu, Maryland, Harford County"
        />
        <meta
          name="description"
          content="China Delight Chinese Restaurant based in Forest Hill, MD. We do dine-in, carryout, and online orders!"
        />
        <meta name="author" content="Will Zhang" />
        <a href="https://www.chinadelightmd.com/menu"> Menu </a>
        <a href="https://www.chinadelightmd.com/dinner-combo"> Dinner </a>
        <a href="https://www.chinadelightmd.com/chef"> Specials </a>
        <a href="https://www.chinadelightmd.com/sides"> Sides </a>
        <a href="https://www.chinadelightmd.com/appetizers">Appetizers</a>
        <title> China Delight - Forest Hill MD </title>
        {/* google ads */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5614337634469357"
          crossorigin="anonymous"
        ></script>
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9RK4LGZH98"
        ></script>
      </Helmet>
      <ThemeProvider theme={theme}>
        <Router>
          {/* <Test /> */}
          <CartProvider>
            <AppShell />
          </CartProvider>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
