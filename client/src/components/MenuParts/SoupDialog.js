import { React, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  Add as AddIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";
import {
  Grid,
  Box,
  Fab,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
  makeStyles,
  Divider,
} from "@material-ui/core";

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
    color: "#b5b5b5",
    marginLeft: 10,
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SoupDialog = (props) => {
  const {
    onClose,
    open,
    onAdd,
    title,
    description,
    img,
    priceSm,
    priceLg,
  } = props;

  console.log(props);

  const [riceValue, setRiceValue] = useState("white rice");
  const [sideValue, setSideValue] = useState("none");
  const [quantity, setQuantity] = useState(1);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const handleAddItem = () => {
    onAdd();
  };

  const handleRiceChange = (e) => {
    setRiceValue(e.target.value);
  };

  const handleSideChange = (e) => {
    setSideValue(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth="sm"
        maxWidth="md"
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle
          id="responsive-dialog-title"
          className={classes.dialogTitle}
        >
          <div style={{ display: "flex" }}>
            {" "}
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              {title}{" "}
            </Typography>{" "}
            <IconButton color="primary" onClick={handleClose}>
              {" "}
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          {" "}
          <Box textAlign="center">
            {" "}
            <Grid container>
              {" "}
              <Grid Item xs={12} sm={6} className={classes.gridPadding}>
                {" "}
                <img className={classes.img} src={img} alt=" sweet sour" />
              </Grid>
              <Grid Item xs={12} sm={6}>
                please choose from the options below:
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>rice: </Typography>
                    <Typography className={classes.selectedValue}>
                      {riceValue}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <FormControl component="fieldset">
                        <FormLabel component="legend"> select one: </FormLabel>
                        <RadioGroup
                          aria-label="rices"
                          name="rices1"
                          value={riceValue}
                          onChange={handleRiceChange}
                        >
                          <FormControlLabel
                            value="white rice"
                            control={<Radio />}
                            label="white rice"
                          />
                          <FormControlLabel
                            value="fried rice"
                            control={<Radio />}
                            label="fried rice"
                          />
                          <FormControlLabel
                            value="lo mein"
                            control={<Radio />}
                            label="lo mein (+1.75)"
                          />
                          <FormControlLabel
                            value="pork fried rice"
                            control={<Radio />}
                            label="pork fried rice (+1.75)"
                          />
                        </RadioGroup>
                      </FormControl>{" "}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography className={classes.heading}>
                      sides (+.75):
                    </Typography>
                    <Typography className={classes.selectedValue}>
                      {sideValue}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <FormControl component="fieldset">
                        <FormLabel component="legend"> select one: </FormLabel>
                        <RadioGroup
                          aria-label="rices"
                          name="rices1"
                          value={sideValue}
                          onChange={handleSideChange}
                        >
                          <FormControlLabel
                            value="none"
                            control={<Radio />}
                            label="none"
                          />
                          <FormControlLabel
                            value="egg roll"
                            control={<Radio />}
                            label="egg roll"
                          />
                          <FormControlLabel
                            value="soda"
                            control={<Radio />}
                            label="soda"
                          />
                          <FormControlLabel
                            value="wonton soup"
                            control={<Radio />}
                            label="wonton soup"
                          />
                          <FormControlLabel
                            value="egg drop soup"
                            control={<Radio />}
                            label="egg drop soup"
                          />
                          <FormControlLabel
                            value="hot & sour soup"
                            control={<Radio />}
                            label="hot & sour soup"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Box>
          <Divider className={classes.divider} />
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
                  <Typography>
                    {" "}
                    {description} {priceSm} {priceLg}{" "}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>reviews</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography> feature work in progress </Typography>
                </AccordionDetails>
              </Accordion>{" "}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              {" "}
              qty{" "}
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={quantity}
              onChange={handleQuantityChange}
              label="qty"
            >
              {[...Array(20)].map((_id, i) => (
                <MenuItem value={i + 1}> {i + 1}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box pt={1.5} px={1.5}>
            <Fab
              variant="extended"
              size="medium"
              color="secondary"
              aria-label="add"
              onClick={handleAddItem}
            >
              {" "}
              <AddIcon />
              Add to Cart{" "}
            </Fab>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SoupDialog;
