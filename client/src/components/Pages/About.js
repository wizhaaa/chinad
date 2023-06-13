import React from "react";

import {withStyles, makeStyles} from "@material-ui/core/styles";
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
} from "@material-ui/core";
import {ExpandMore as ExpandMoreIcon} from "@material-ui/icons";

import {ingredients, pricing} from "../Data/AboutData";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: "auto",
    maxWidth: 700,
  },
});

function About() {
  const classes = useStyles();

  const ingredientTable = (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell> Item </StyledTableCell>
            <StyledTableCell align="right"> Description </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ingredients.map((item) => (
            <StyledTableRow key={item.name}>
              <StyledTableCell component="th" scope="row">
                {item.name}
              </StyledTableCell>
              <StyledTableCell align="right">{item.des}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const pricingTable = (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell> Item </StyledTableCell>
            <StyledTableCell align="right">
              {" "}
              Cost (Pint / Quart){" "}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pricing.map((item) => (
            <StyledTableRow key={item.name}>
              <StyledTableCell component="th" scope="row">
                {item.name}
              </StyledTableCell>
              <StyledTableCell align="right">{item.cost}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div className="About">
      <Box textAlign="center" m={1} py={8}>
        <Typography variant="h4" gutterBottom>
          About
        </Typography>
        <Typography variant="body1" gutterBottom>
          {" "}
          Have more questions? Call us at 410-877-9490 or email us at{" "}
          <a href="mailto:chinadelightmd@gmail.com">
            {" "}
            chinadelightmd@gmail.com{" "}
          </a>{" "}
        </Typography>
        <br />

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography> FAQ:</Typography>
            <Typography></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box textAlign="left">
              <Typography variant="body1">
                {" "}
                What are your Holiday Hours?{" "}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {" "}
                &emsp; We are open every day of the year{" "}
                <strong> EXCEPT: Tuesdays & Thanksgiving. </strong> Our Holidays
                hours are the same as our regular hours.{" "}
              </Typography>{" "}
              <br />
              <Typography variant="body1"> Do you deliver? </Typography>
              <Typography variant="body2" gutterBottom>
                {" "}
                &emsp; Usually not. However, you can order delivery on{" "}
                <a href="https://www.doordash.com/store/china-delight-forest-hill-438714/?utm_campaign=gpa">
                  {" "}
                  DoorDash
                </a>
                .{" "}
              </Typography>{" "}
              <br />
              <Typography variant="body1"> What oil do you use? </Typography>
              <Typography variant="body2" gutterBottom>
                {" "}
                &emsp; Vegetable oil{" "}
              </Typography>{" "}
              <br />
              <Typography variant="body1">
                {" "}
                Accounts? Favorites? Order History?{" "}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {" "}
                &emsp; We will try to work on this in future if time allows.{" "}
              </Typography>{" "}
              <br />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography> Pricing:</Typography>
            <Typography></Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography> {pricingTable} </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography> Order Times:</Typography>
            <Typography></Typography>
          </AccordionSummary>
          <AccordionDetails>
            {" "}
            <Box textAlign="left">
              <Typography>
                {" "}
                When it is not very busy, orders can be finished with 10-15
                minutes. On busy nights like{" "}
                <strong>
                  Thursdays, Fridays, Saturdays, and Holidays,{" "}
                </strong>{" "}
                orders can take much longer. ~30 min - 1 hour.
                <br></br> <strong>Major holidays</strong> such as Thanksgiving,
                Christmas week, and New Years can result in orders taking up to
                1-2 hours. Thank you for your patience!{" "}
              </Typography>
              {/* <Typography> These times are only for reference. </Typography>
              <Box> {orderTimesTable} </Box>{" "} */}
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography> Ingredients: </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box textAlign="left">
              <Typography gutterBottom> 🔥 = spicy </Typography>
              <Box p={1}> </Box>
              <Box textAlign="center">{ingredientTable}</Box>{" "}
            </Box>
          </AccordionDetails>
        </Accordion>

        <Box py={5}> </Box>
        <Box className="bottomAbout">
          {" "}
          <Typography variant="h4" gutterBottom>
            {" "}
            About the site{" "}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {" "}
            This website was made with 💗 by WZ © {new Date().getFullYear()}{" "}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {" "}
            Source code can be found at{" "}
            <a href="https://github.com/notwz/chinad"> GitHub</a>{" "}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {" "}
            A MERN stack application{" "}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {" "}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default About;
