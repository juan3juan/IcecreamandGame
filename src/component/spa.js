import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormGroup,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      left: theme.spacing(2),
    },
  },
}));

const Spa = () => {
  const classes = useStyles();
  const [spaDetail, setValues] = useState({
    services: [],
    message: "",
    totalPrice: 0,
  });
  const spa_services = {
    manicure: {
      type: "manicure ",
      price: 15,
    },
    pedicure: {
      type: "pedicure  ",
      price: 30,
    },
    both: {
      price: 35,
    },
  };
  const handlesubmit = () => {
    let totalprice = 0;
    if (spaDetail.services.length === 2) {
      totalprice = spa_services.both.price;
    } else if (spaDetail.services.includes(spa_services.manicure.type)) {
      totalprice = spa_services.manicure.price;
    } else if (spaDetail.services.includes(spa_services.pedicure.type)) {
      totalprice = spa_services.pedicure.price;
    }
    if (totalprice === 0) {
      setValues({
        ...spaDetail,
        message: "Please Select a Service or both Services for your Spa",
      });
    } else {
      setValues({
        ...spaDetail,
        totalPrice: totalprice,
        message: "Your total charge is: " + totalprice,
      });
    }
  };
  const handleselect = (event) => {
    let service = event.target.name;
    let select = event.target.checked;
    let spa_services = spaDetail.services;
    if (select) {
      spa_services.push(service);
    } else {
      var index = spa_services.indexOf(service);
      spa_services.splice(index, 1);
    }
    setValues({
      ...spaDetail,
      spa_services: spa_services,
    });
  };
  return (
    <>
      <div className={classes.root}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select Service for your Spa</FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={spaDetail.services.includes(
                    spa_services.pedicure.type
                  )}
                  onChange={handleselect}
                  name={spa_services.pedicure.type}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                />
              }
              label={spa_services.pedicure.type}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={spaDetail.services.includes(
                    spa_services.manicure.type
                  )}
                  onChange={handleselect}
                  name={spa_services.manicure.type}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                />
              }
              label={spa_services.manicure.type}
            />
          </FormGroup>
        </FormControl>
      </div>
      <div className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlesubmit()}
        >
          Submit Order
        </Button>
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            label="Order Detail"
            value={spaDetail.message}
            variant="outlined"
          />
        </FormControl>
      </div>
    </>
  );
};
export default Spa;
