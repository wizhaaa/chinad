import React, { useState } from "react";
import {
  DialogContentText,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";

const Performance = () => {
  [expanded, setExpanded] = useState(false);

  return (
    <>
      // Render entire thing //
      <DialogContentText className={classes.container}>
        {" "}
        <Typography pl={50}>
          <Typography variant="h5" gutterBottom>
            About
          </Typography>

          <Typography gutterBottom> {description} </Typography>
          <Divider className={classes.divider} />

          <Typography variant="h5" gutterBottom>
            Reviews
          </Typography>

          <Typography></Typography>
          <Review title={title} reviews={reviews} category="dinner" />
        </Typography>
      </DialogContentText>
      // render only on click, using accordion and expanded state const //
      <DialogContentText className={classes.container}>
        {" "}
        <Typography pl={50}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>about</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography> {description} </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              onClick={() => setExpanded(!expanded)}
            >
              <Typography className={classes.heading}>reviews</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {expanded && (
                <Reviews title={title} reviews={reviews} category="lunch" />
              )}
            </AccordionDetails>
          </Accordion>{" "}
        </Typography>
      </DialogContentText>
      ;
    </>
  );
};
