import React from "react";
import {Helmet} from "react-helmet";
import {Typography, Grid, Box} from "@material-ui/core";
import {NavigateNext as NavigateNextIcon} from "@material-ui/icons";

function Home() {
  return (
    <div className="Home">
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
          content="China Delight Chinese Restaurant based in Forest Hill, Maryland. Serve the Bel Air, Fallston, and Jarrestville area. We do dine-in, carryout, and online orders!"
        />
        <meta name="author" content="Will Zhang" />
        <a href="https://www.chinadelightmd.com/menu"> Menu </a>
        <a href="https://www.chinadelightmd.com/dinner-combo"> Dinner </a>
        <a href="https://www.chinadelightmd.com/chef"> Specials </a>
        <a href="https://www.chinadelightmd.com/sides"> Sides </a>
        <a href="https://www.chinadelightmd.com/appetizers">Appetizers</a>
        <title> China Delight - Forest Hill, MD </title>
      </Helmet>
      <Typography component="div">
        <Box textAlign="center" m={1} py={8}>
          {/* HOME PAGE ALERT — hidden, bring back when there's a real notice
          <Typography style={{paddingBottom: "80px"}}>
            <Alert
              severity="info"
              style={{background: "#B41E22", fontSize: "1.15rem"}}
            >
              <AlertTitle style={{fontSize: "1.25rem"}}>
                <strong> Holiday Hours Notice </strong>
              </AlertTitle>
              China Delight will be <strong> closed </strong> on Thanksgiving
              Day.
              <br />
              We will be <strong>open</strong> on Christmas Eve (Tuesday,
              December 24th), Christmas Day, and New Years Eve (Tuesday,
              December 31st) and New Years Day.
              <br />
              Thank you for understanding!
            </Alert>
          </Typography>
          */}

          {/* LANTERN HERO */}
          <Box className="lanternHero">
            <img
              src="https://media3.giphy.com/media/48PbiL2u5ZUU6HZf55/giphy.gif"
              alt="China Delight"
              className="lanternHeroImage"
            />
            <Box className="lanternHeroOverlay">
              <Typography
                className="lanternHeroChinese"
                style={{fontFamily: "Zhi Mang Xing, cursive"}}
              >
                欢 迎 光 临
              </Typography>
              <Typography variant="h2" className="lanternHeroTitle">
                China Delight
              </Typography>
              <Typography className="lanternHeroSub">
                Forest Hill, Maryland · Authentic Chinese Cuisine
              </Typography>
              <Box className="lanternHeroCtas">
                <a className="ctaPrimary" href="/v0/menu">
                  Order Online <NavigateNextIcon />
                </a>
                <a className="ctaGhost" href="/v0/menu">
                  View Menu
                </a>
              </Box>
            </Box>
          </Box>

          <Box py={4}></Box>
          <Typography variant="body1" gutterBottom className="lanternIntro">
            你好!~ Welcome to China Delight — a local Chinese cuisine take-out
            and dine-in restaurant in Forest Hill, MD.
          </Typography>
          <Typography
            variant="subtitle"
            gutterBottom
            className="lanternDisclaimer"
          >
            <em>
              Disclaimer: photos are not exact replications of our dishes and
              are to serve as references.
            </em>
          </Typography>
          <Box py={4}></Box>

          {/* FEATURED TILES */}
          <Typography variant="h4" className="lanternSectionTitle" gutterBottom>
            — Featured —
          </Typography>
          <Box className="homeGallery">
            <Grid container spacing={4}>
              <Grid
                item
                xs={12}
                sm={4}
                className="homeMenuBtn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <a
                  className="homeButton"
                  size="large"
                  href="/v0/menu"
                  style={{whiteSpace: "nowrap"}}
                >
                  Menu <NavigateNextIcon color="#ffe9c3" />
                </a>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                className="homeLunchBtn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <a
                  className="homeButton"
                  size="large"
                  href="/v0/lunch"
                  style={{whiteSpace: "nowrap"}}
                >
                  Lunch <NavigateNextIcon color="#ffe9c3" />
                </a>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                className="homeDinnerBtn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <a
                  className="homeButton"
                  size="large"
                  href="/v0/dinner-combo"
                  style={{whiteSpace: "nowrap"}}
                >
                  Dinner <NavigateNextIcon color="#ffe9c3" />
                </a>
              </Grid>
            </Grid>
          </Box>
          <Box py={8}> </Box>

          {/* INFO BAR: Hours / Visit / Contact */}
          <Box className="lanternInfoBar">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4} className="lanternInfoCol">
                <Typography variant="h4" className="lanternInfoTitle">
                  Hours
                </Typography>
                <Box className="lanternInfoBody">
                  <div>
                    <strong>Mon – Sat</strong>
                    <span>11 AM – 9:30 PM</span>
                  </div>
                  <div>
                    <strong>Sunday</strong>
                    <span>12 PM – 8:30 PM</span>
                  </div>
                  <div>
                    <strong>Tuesday</strong>
                    <span>Closed</span>
                  </div>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4} className="lanternInfoCol">
                <Typography variant="h4" className="lanternInfoTitle">
                  Visit
                </Typography>
                <Box className="lanternInfoBody">
                  <div>📍 1E Newport Dr</div>
                  <div>Forest Hill, MD 21050</div>
                  <em>On Rt. 24, across from Enotria</em>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4} className="lanternInfoCol">
                <Typography variant="h4" className="lanternInfoTitle">
                  Contact
                </Typography>
                <Box className="lanternInfoBody">
                  <div>📞 410-877-9490</div>
                  <div>
                    📩{" "}
                    <a href="mailto:chinadelightmd@gmail.com">
                      chinadelightmd@gmail.com
                    </a>
                  </div>
                </Box>
              </Grid>
            </Grid>

            <Box py={3}></Box>
            <iframe
              title="china delight map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3075.182788165903!2d-76.3879002845251!3d39.57803061414107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c7deb7b8b012ab%3A0xd3e57330e03df815!2sChina%20Delight!5e0!3m2!1sen!2sus!4v1617983002384!5m2!1sen!2sus"
              width="960"
              height="450"
              className="lanternMap"
              style={{border: 0, maxWidth: "100%"}}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Box>
        </Box>
      </Typography>
    </div>
  );
}

export default Home;
