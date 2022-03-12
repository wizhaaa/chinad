import { React, useState } from "react"; 
import {
  ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";
import {
  Accordion, AccordionDetails, AccordionSummary, Typography, FormControl, FormLabel,
  FormControlLabel, Radio, RadioGroup, makeStyles
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: { margin: 10 },
  gridPadding: {
    padding: 15,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  addIcon: {
    display: "flex",
    justifyContent: "flex-end",
  },
  bottomText: {
    justifyContent: "center",
  },
  container: {
    display: "flex",
    justifyContent: "space-evenly",
    paddingBottom: theme.spacing(3),
    flexWrap: "wrap",
  },
  img: {
    maxWidth: 300,
    maxHeight: 300,
    height: 230,
    width: "100%",
    objectFit: "cover",
  },

  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
  },
  dialogTitle: {
    paddingRight: "0px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  divider: { margin: theme.spacing(3) },
  selectedValue: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.text.secondary,
    marginLeft: 10,
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textFields: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const SauceOptions = (props) => {
  const { sauceValue, handleSauceChange } = props;
  const classes = useStyles();
  


  return (
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Sauce: </Typography>
            <Typography className={classes.selectedValue}>
              {sauceValue}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <FormControl component="fieldset">
                <FormLabel component="legend"> Select one: </FormLabel>
                <RadioGroup
                  aria-label="style"
                  name="style"
                  value={sauceValue}
                  onChange={handleSauceChange}
                >
                  <FormControlLabel
                    value="Brown Sauce"
                    control={<Radio />}
                    label="Brown Sauce"
                  />
                  <FormControlLabel
                    value="White Sauce "
                    control={<Radio />}
                    label="White Sauce"
                />
                <FormControlLabel
                    value="No Sauce "
                    control={<Radio />}
                    label="No Sauce"
                  />
                </RadioGroup>
              </FormControl>{" "}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
  );
  
}
 
export default SauceOptions
