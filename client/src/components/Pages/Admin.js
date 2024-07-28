import React, {useState, useEffect} from "react";

import {Typography, Box, Switch, Grid} from "@material-ui/core";

import Graph from "../Utils/Graph";

import api from "../api";
function Admin() {
  const [log, setLog] = useState("Everything is working fine. :)");
  const [status, setStatus] = useState("null");
  const [localStatus, setLocalStatus] = useState(status);
  const [allStats, setAllStats] = useState({});
  const [topTenDishes, setTopTenDishes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getOnlineStatus = async () => {
    const res = await api.get("/api/online");
    const wes = await api.get("/api/stats/popular");
    const popularDishData = wes.data.topTen;
    console.log("result", popularDishData);
    setTopTenDishes(popularDishData);
    setStatus(res.data);
    setLocalStatus(res.data);
  };

  const loadStats = async () => {
    const res = await api.get("/api/stats");
    setAllStats(res.data);
    setLoaded(true);
  };

  useEffect(() => {
    getOnlineStatus();
    loadStats();
  }, []);

  const turnOff = async () => {
    const response = await api.post("/api/online/off");
    if (response.status !== 200) {
      setLog("Something went wrong :(");
    }
    getOnlineStatus();
    setLocalStatus(false);
  };
  const turnOn = async () => {
    const response = await api.post("/api/online/on");
    if (response.status !== 200) {
      setLog("Something went wrong :(");
    }
    getOnlineStatus();
    setLocalStatus(true);
  };

  const handleSwitch = async () => {
    if (localStatus) {
      await turnOff();
    } else {
      await turnOn();
    }
  };

  // Dashboard & Helpers

  const TopTen = () => {
    return (
      <Box
        sx={{
          padding: "30px",
          margin: "20px 0",
          backgroundColor: "#f7f7f7",
          borderRadius: "20px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          display: "flex",
          flexFlow: "column nowrap",
          textAlign: "center",
          gap: "50px",
        }}
      >
        <Box
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            textAlign: "start",
          }}
        >
          Most Popular Dishes
        </Box>
        <Box
          sx={{
            display: "flex",
            flexFlow: "column wrap",
            justifyContent: "left",
            textAlign: "left",
            gap: "20px",
          }}
        >
          {Object.keys(topTenDishes).map((dish) => {
            return (
              <Box>
                {dish} : {topTenDishes[dish]}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };

  if (!loaded) {
    return <> Loading.. </>;
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          flexFlow: "column nowrap",
          width: "100%",
          padding: "2% 5%",
        }}
      >
        <Typography
          style={{
            fontSize: "2rem",
            fontWeight: "900",
          }}
          gutterBottom
        >
          Welcome, Admin.
        </Typography>
        <Box
          sx={{
            padding: "30px",
            margin: "20px 0",
            backgroundColor: "#f7f7f7",
            borderRadius: "20px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Typography>{log}</Typography>
        </Box>

        <Box
          sx={{
            padding: "30px",
            margin: "20px 0",
            backgroundColor: "#f7f7f7",
            borderRadius: "20px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
            }}
            gutterBottom
          >
            Control Panel
          </Typography>
          <Typography gutterBottom>
            <Box
              sx={{
                display: "inline-block",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: status ? "#54d672" : "#d65458",
                marginRight: "5px",
                marginBottom: "-3px",
              }}
            />
            <b>Remote Status: </b> {status ? "Live" : "Offline"}
          </Typography>
          <Typography gutterBottom>
            <Box
              sx={{
                display: "inline-block",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: localStatus ? "#54d672" : "#d65458",
                marginRight: "5px",
                marginBottom: "-3px",
              }}
            />
            <b>Local Status: </b>
            {localStatus ? "Live" : "Offline"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "flex-start",
              gap: "20px",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <Typography
              style={{
                fontSize: "1rem",
                fontWeight: "700",
                padding: "5px 0",
              }}
            >
              Off
            </Typography>
            <Switch
              checked={localStatus}
              onChange={() => handleSwitch()}
              color="primary"
            />
            <Typography
              style={{
                fontSize: "1rem",
                fontWeight: "700",
                padding: "5px 0",
              }}
            >
              On
            </Typography>
          </Box>
        </Box>
        <TopTen />
        <Graph />
      </Box>
    );
  }
}

export default Admin;
