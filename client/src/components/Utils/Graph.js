import React, {useState, useEffect} from "react";

import {
  Typography,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";

import {ViewWeek, CalendarToday, QueryBuilder} from "@material-ui/icons";

import api from "../api";
function Graph() {
  const [allStats, setAllStats] = useState({});
  const [loaded, setLoaded] = useState(false);

  const [year, setYear] = useState("y2022");
  const [stat, setStat] = useState("count");

  const years = ["y2021", "y2022", "y2023"];
  const [compare, setCompare] = useState(true);

  const handleStatSelect = (event) => {
    setStat(event.target.value);
  };
  const handleYearSelect = (event) => {
    setYear(event.target.value);
    if (event.target.value !== "y2021") setCompare(true);
    else setCompare(false);
  };

  const loadStats = async () => {
    const res = await api.get("/api/stats");
    setAllStats(res.data);
    setLoaded(true);
  };

  useEffect(() => {
    loadStats();
  }, []);

  let index = years.indexOf(year) - 1;
  let lastYear = years[index];
  let lastYearsRevenue;
  let revenueChange;
  let orderChange;
  let avgChange;

  // Dashboard & Helpers
  function formatToUSD(number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(number);
  }
  const HourlyGraph = ({stat}) => {
    const hours = Array.from({length: 11}, (_, i) => `h${i + 11}`);
    const hourLabels = Array.from({length: 11}, (_, i) => {
      if (i + 11 > 12) return `${i + 11 - 12} pm`;
      else if (i + 11 === 12) return `${i + 11} pm`;
      else return `${i + 11} am`;
    });
    const maxVal = Math.max(
      ...hours.map((hr) => allStats[stat][year].hours[hr])
    );

    const bar = (hr, i) => {
      return (
        <Box
          sx={{
            height: `200px`,
            display: "flex",
            flexFlow: "column nowrap",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "10px",
              height: `${(hr / maxVal) * 70}%`,
              background: "#cf86c1",
              marginBottom: "10px",
            }}
          ></Box>
          <Typography style={{fontWeight: "900", fontSize: "1.4rem"}}>
            {hourLabels[i].split(" ")[0]}
            <span style={{fontWeight: "500", fontSize: "0.9rem"}}>
              {" "}
              {hourLabels[i].split(" ")[1]}
            </span>
          </Typography>
          <Typography style={{fontWeight: "700", fontSize: "0.7rem"}}>
            ({stat === "revenue" ? formatToUSD(hr) : hr})
          </Typography>
        </Box>
      );
    };

    const BarGraph = () => {
      return (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            padding: "30px",
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "center",
            alignItems: "flex-end",
            borderRadius: "20px",
            background: "#fff",
            gap: "3px",
          }}
        >
          {hours.map((hr, i) => {
            const hrVal = allStats[stat][year].hours[hr];

            return bar(hrVal, i);
          })}
        </Box>
      );
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexFlow: "column nowrap",
          gap: "20px",
        }}
      >
        <Box
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            textAlign: "start",
          }}
        >
          <QueryBuilder
            style={{
              verticalAlign: "middle",
              marginTop: "-5px",
              marginRight: "10px",
              fontSize: "1.8rem",
            }}
          />
          Daily View
        </Box>
        <BarGraph />
      </Box>
    );
  };
  const DailyGraph = ({stat}) => {
    const allDays = ["Sun", "Mon", "Wed", "Thu", "Fri", "Sat"];
    const minVal =
      Math.min(...allDays.map((day) => allStats[stat][year].days[day])) * 0.8;
    const maxVal =
      Math.max(...allDays.map((day) => allStats[stat][year].days[day])) -
      minVal;

    const bar = (day, i) => {
      return (
        <Box
          sx={{
            height: `200px`,
            display: "flex",
            flexFlow: "column nowrap",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "10px",
              height: `${((day - minVal) / maxVal) * 70}%`,
              background: "#cf86c1",
              marginBottom: "10px",
            }}
          ></Box>
          <Typography style={{fontWeight: "900", fontSize: "1.4rem"}}>
            {allDays[i][0]}
          </Typography>
          <Typography style={{fontWeight: "700", fontSize: "0.9rem"}}>
            ({stat === "revenue" ? formatToUSD(day) : day})
          </Typography>
        </Box>
      );
    };

    const BarGraph = () => {
      return (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            padding: "30px",
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "center",
            alignItems: "flex-end",
            borderRadius: "20px",
            background: "#fff",
            gap: "3px",
          }}
        >
          {allDays.map((day, i) => {
            const dayVal = allStats[stat][year].days[day];
            return bar(dayVal, i);
          })}
        </Box>
      );
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexFlow: "column nowrap",
          gap: "20px",
        }}
      >
        <Box
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            textAlign: "start",
          }}
        >
          <ViewWeek
            fontSize="large"
            style={{
              verticalAlign: "middle",
              marginTop: "-5px",
              marginRight: "10px",
            }}
          />
          Weekly View
        </Box>
        <BarGraph />
      </Box>
    );
  };
  const MonthlyGraph = ({stat}) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthsLabel = [
      "J",
      "F",
      "M",
      "A",
      "M",
      "J",
      "J",
      "A",
      "S",
      "O",
      "N",
      "D",
    ];

    const minVal =
      Math.min(...months.map((month) => allStats[stat][year].months[month])) *
      0.8;
    const maxVal =
      Math.max(...months.map((month) => allStats[stat][year].months[month])) -
      minVal;

    const bar = (month, i) => {
      return (
        <Box
          sx={{
            height: `200px`,
            display: "flex",
            flexFlow: "column nowrap",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "10px",
              height: `${((month - minVal) / maxVal) * 70}%`,
              background: "#cf86c1",
              marginBottom: "10px",
            }}
          ></Box>
          <Typography style={{fontWeight: "900", fontSize: "1.4rem"}}>
            {monthsLabel[i]}
          </Typography>
          <Typography style={{fontWeight: "700", fontSize: "0.9rem"}}>
            ({stat === "revenue" ? formatToUSD(month) : month})
          </Typography>
        </Box>
      );
    };

    const BarGraph = () => {
      return (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            padding: "30px",
            display: "flex",
            flexFlow: "row nowrap",
            justifyContent: "center",
            alignItems: "flex-end",
            borderRadius: "20px",
            background: "#fff",
            gap: "3px",
          }}
        >
          {months.map((month, i) => {
            const monthVal = allStats[stat][year].months[month];
            return bar(monthVal, i);
          })}
        </Box>
      );
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexFlow: "column nowrap",
          gap: "20px",
        }}
      >
        <Box
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            textAlign: "start",
          }}
        >
          <CalendarToday
            style={{
              verticalAlign: "middle",
              marginTop: "-5px",
              marginRight: "10px",
              fontSize: "1.8rem",
            }}
          />
          Monthly View
        </Box>
        <BarGraph />
      </Box>
    );
  };

  const MonthlyTable = ({stat}) => {
    const lastYear = years[years.indexOf(year) - 1];

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthsLabel = [
      "J",
      "F",
      "M",
      "A",
      "M",
      "J",
      "J",
      "A",
      "S",
      "O",
      "N",
      "D",
    ];

    const minVal =
      Math.min(...months.map((month) => allStats[stat][year].months[month])) *
      0.8;
    const maxVal =
      Math.max(...months.map((month) => allStats[stat][year].months[month])) -
      minVal;

    const row = (month, i) => {
      const monthVal = allStats[stat][year].months[month];
      let prevYearMonth;
      let diff;
      if (compare) {
        prevYearMonth = allStats[stat][lastYear].months[month];
        diff = monthVal - prevYearMonth;
      }
      return (
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
              textAlign: "left",
              width: "100%",
              background: i % 2 === 0 ? "#fff" : "#f5f5f5",
              padding: "10px 20px",
              borderStyle: i % 2 === 0 && "solid",
              borderWidth: "1px 0px",
              borderColor: "#black",
            }}
          >
            <Typography
              style={{
                width: "100%",
                height: "100%",
                fontWeight: "600",
                fontSize: "1.1rem",
              }}
            >
              {month}
            </Typography>
            <Typography
              style={{
                width: "100%",
                fontWeight: "500",
                fontSize: "0.9rem",
              }}
            >
              {stat === "revenue" ? formatToUSD(monthVal) : monthVal}
            </Typography>
            <Typography
              style={{
                width: "100%",
                color: diff > 0 ? "#4caf50" : "#f44336",
                fontWeight: "500",
                fontSize: "0.9rem",
              }}
            >
              {compare && (
                <>
                  {diff > 0 ? "+" : ""}
                  {stat === "revenue" ? formatToUSD(diff) : diff}
                </>
              )}
            </Typography>
          </Box>
        </Grid>
      );
    };

    const Table = () => {
      return (
        <Grid container>
          {months.map((month, i) => {
            return row(month, i);
          })}
        </Grid>
      );
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexFlow: "column nowrap",
          gap: "20px",
          padding: "40px 0",
        }}
      >
        <Box
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            textAlign: "start",
          }}
        >
          <CalendarToday
            style={{
              verticalAlign: "middle",
              marginTop: "-5px",
              marginRight: "10px",
              fontSize: "1.8rem",
            }}
          />
          Monthly Table
        </Box>
        <Table />
      </Box>
    );
  };

  const Dashboard = ({stats = allStats, title = "Year to date"}) => {
    if (compare) {
      lastYearsRevenue = allStats.revenue[lastYear].total;
      revenueChange = Math.round(
        ((allStats.revenue[year].total - lastYearsRevenue) / lastYearsRevenue) *
          100
      );
      let lastYearsOrders = allStats.count[lastYear].total;
      orderChange = Math.round(
        ((allStats.count[year].total - lastYearsOrders) / lastYearsOrders) * 100
      );
      let lastYearAvg = allStats.averageOrderTotal[lastYear].total;
      avgChange = Math.round(
        ((allStats.averageOrderTotal[year].total - lastYearAvg) / lastYearAvg) *
          100
      );
    }
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
          <Grid item xs={12} md={6}>
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
                {formatToUSD(stats.revenue[year].total)}
                {compare && (
                  <Box
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "700",
                      color: revenueChange > 0 ? "green" : "red",
                    }}
                  >
                    {revenueChange > 0 ? "+" : ""}
                    {revenueChange}%
                  </Box>
                )}
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
                {stats.count[year].total}
                {compare && (
                  <Box
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "700",
                      color: orderChange > 0 ? "green" : "red",
                    }}
                  >
                    {orderChange > 0 ? "+" : ""}
                    {orderChange}%
                  </Box>
                )}
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
                {formatToUSD(stats.averageOrderTotal[year].total)}
                {compare && (
                  <Box
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "700",
                      color: avgChange > 0 ? "green" : "red",
                    }}
                  >
                    {avgChange > 0 ? "+" : ""}
                    {avgChange}%
                  </Box>
                )}
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
        }}
      >
        <Typography
          style={{
            fontSize: "2rem",
            fontWeight: "900",
          }}
          gutterBottom
        >
          Order Statistics
        </Typography>
        <FormControl sx={{m: 1, minWidth: 120}} size="small">
          <Box
            sx={{
              display: "flex",
              flexFlow: "row nowrap",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Box>
              <Typography style={{fontWeight: "700"}} gutterBottom>
                Year
              </Typography>
              <Select
                labelId="year-select-label"
                id="year-select"
                value={year}
                label="Viewing Year"
                onChange={handleYearSelect}
                variant="outlined"
              >
                {years.map((year) => (
                  <MenuItem value={year}>{year}</MenuItem>
                ))}
              </Select>
            </Box>
            <Box>
              <Typography style={{fontWeight: "700"}} gutterBottom>
                Stat
              </Typography>
              <Select
                labelId="stat-select-label"
                id="stat-select"
                value={stat}
                label="Viewing Year"
                onChange={handleStatSelect}
                variant="outlined"
              >
                <MenuItem value="count">Order Counts</MenuItem>
                <MenuItem value="revenue">Order Revenues</MenuItem>
              </Select>
            </Box>
          </Box>
        </FormControl>

        <Dashboard title={`Stats for ${year.toUpperCase()}`} />
        <MonthlyTable stat={stat} />
        <Box
          sx={{
            padding: "30px 30px",
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
          <HourlyGraph stat={stat} />
          <DailyGraph stat={stat} />
          <MonthlyGraph stat={stat} />
        </Box>
      </Box>
    );
  }
}

export default Graph;
