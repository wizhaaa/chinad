import React, {useState, useEffect} from "react";

import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Button,
  Switch,
} from "@material-ui/core";

import api from "../api";
function Admin() {
  const [log, setLog] = useState("Everything is working fine. :)");
  const [status, setStatus] = useState("null");
  const [localStatus, setLocalStatus] = useState(status);

  const getOnlineStatus = async () => {
    const res = await api.get("/api/online");
    setStatus(res.data);
    setLocalStatus(res.data);
  };

  useEffect(() => {
    getOnlineStatus();
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
          padding: "20px",
          margin: "20px 0",
          backgroundColor: "#f7f7f7",
          borderRadius: "20px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Typography gutterBottom>{log}</Typography>
      </Box>

      <Box
        sx={{
          padding: "20px",
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
    </Box>
  );
}

export default Admin;
