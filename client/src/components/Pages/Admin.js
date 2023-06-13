import React, {useState, useEffect} from "react";

import {Typography, Box, Switch, Grid} from "@material-ui/core";

import Graph from "../Utils/Graph";

import api from "../api";
function Admin() {
  const [log, setLog] = useState("Everything is working fine. :)");
  const [status, setStatus] = useState("null");
  const [localStatus, setLocalStatus] = useState(status);
  const [allStats, setAllStats] = useState({});
  const [loaded, setLoaded] = useState(false);

  const [year, setYear] = useState("y2022");

  const getOnlineStatus = async () => {
    const res = await api.get("/api/online");
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
  function formatToUSD(number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
  }

  const Dashboard = ({stats = allStats, title = "Year to date"}) => {
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
          {title}
        </Box>
        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
          }}
        >
          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                padding: "30px",
                backgroundColor: "#fff",
                borderRadius: "20px",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
              }}
            >
              <Typography>Total Online Revenue</Typography>
              <Box
                sx={{
                  fontSize: "2rem",
                  fontWeight: "700",
                }}
              >
                {formatToUSD(stats.revenue.all)}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                padding: "30px",
                backgroundColor: "#fff",
                borderRadius: "20px",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
              }}
            >
              <Typography>Total Orders</Typography>
              <Box
                sx={{
                  fontSize: "2rem",
                  fontWeight: "700",
                }}
              >
                {stats.count.all}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Box
              sx={{
                padding: "30px",
                backgroundColor: "#fff",
                borderRadius: "20px",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
              }}
            >
              <Typography>Average Order Total</Typography>
              <Box
                sx={{
                  fontSize: "2rem",
                  fontWeight: "700",
                }}
              >
                {formatToUSD(stats.averageOrderTotal.all)}
              </Box>
            </Box>
          </Grid>
        </Grid>
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
        <Graph />
      </Box>
    );
  }
}

export default Admin;
