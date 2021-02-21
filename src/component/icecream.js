import React, { useState } from "react";
import {
  Button,
  FormControl,
  TextField,
  FormLabel,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Checkbox,
  Radio,
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
const Icecream = () => {
  const classes = useStyles();
  const [orderDetail, setValues] = useState({
    baseType: "",
    baseprice: 0,
    primary_flavor: "",
    toppings: [],
    totalPrice: 0,
    order_message: "Please start to customize your Ice Cream",
  });
  console.log(orderDetail);
  const baseType = {
    one_scoop: "One Scoop",
    two_scoop: "Two Scoop",
    three_scroop: "Three Scroop",
  };
  const basePrice = {
    "One Scoop": 4.5,
    "Two Scoop": 8.0,
    "Three Scroop": 11.0,
  };
  const primary_Flavor = {
    chocolate: "Chocolate",
    strawberry: "Strawberry",
    vanilla: "Vanilla",
  };
  const toppings = {
    nuts: "Nuts",
    whipped_cream: "Whipped Cream",
    cherries: "Cherries",
    topping_price: 0.75,
  };
  const handleRadio = (event) => {
    let type = event.target.value;
    let price = basePrice[type];
    setValues({
      ...orderDetail,
      baseType: type,
      baseprice: price,
    });
  };
  const handleflavorSubmit = (event) => {
    let flavor = event.target.value;
    setValues({
      ...orderDetail,
      primary_flavor: flavor,
    });
  };
  const handleToppings = (event) => {
    let topping = event.target.name;
    let select = event.target.checked;
    let toppings = orderDetail.toppings;
    if (select) {
      toppings.push(topping);
    } else {
      var index = toppings.indexOf(topping);
      toppings.splice(index, 1);
    }
    setValues({
      ...orderDetail,
      toppings: toppings,
    });
  };
  const handleorderSubmit = () => {
    let message = "";
    let totalPrice = 0;
    if (orderDetail.baseType === "") {
      message = "Please choose a base for your Ice Cream First";
    } else if (orderDetail.primary_flavor === "") {
      message = "Please choose your Priamry Flavor for your Ice Cream";
    } else {
      totalPrice = orderDetail.baseprice;
      totalPrice += toppings.topping_price * orderDetail.toppings.length;
      message = "Your total charge is: $" + totalPrice;
    }
    setValues({
      ...orderDetail,
      totalPrice: totalPrice,
      order_message: message,
    });
  };
  return (
    <>
      <div className={classes.root}>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Select Base for your Icecream
          </FormLabel>
          <RadioGroup onChange={handleRadio} value={orderDetail.baseType} row>
            <FormControlLabel
              value={baseType.one_scoop}
              control={<Radio color="primary" />}
              label={
                baseType.one_scoop + " for $" + basePrice[baseType.one_scoop]
              }
            />
            <FormControlLabel
              value={baseType.two_scoop}
              control={<Radio color="primary" />}
              label={
                baseType.two_scoop + " for $" + basePrice[baseType.two_scoop]
              }
            />
            <FormControlLabel
              value={baseType.three_scroop}
              control={<Radio color="primary" />}
              label={
                baseType.three_scroop +
                " for $" +
                basePrice[baseType.three_scroop]
              }
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className={classes.root}>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Select Primary Flavor for your Icecream
          </FormLabel>
          <RadioGroup
            onChange={handleflavorSubmit}
            value={orderDetail.primaryflavor}
            row
          >
            <FormControlLabel
              value={primary_Flavor.vanilla}
              control={<Radio />}
              label={primary_Flavor.vanilla}
            />
            <FormControlLabel
              value={primary_Flavor.strawberry}
              control={<Radio />}
              label={primary_Flavor.strawberry}
            />
            <FormControlLabel
              value={primary_Flavor.chocolate}
              control={<Radio />}
              label={primary_Flavor.chocolate}
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className={classes.root}>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Select Base for your Icecream
          </FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={orderDetail.toppings.includes(toppings.nuts)}
                  onChange={handleToppings}
                  name={toppings.nuts}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                />
              }
              label={toppings.nuts}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={orderDetail.toppings.includes(
                    toppings.whipped_cream
                  )}
                  onChange={handleToppings}
                  name={toppings.whipped_cream}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                />
              }
              label={toppings.whipped_cream}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={orderDetail.toppings.includes(toppings.cherries)}
                  onChange={handleToppings}
                  name={toppings.cherries}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                />
              }
              label={toppings.cherries}
            />
          </FormGroup>
        </FormControl>
      </div>

      <div className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleorderSubmit()}
        >
          Submit Order
        </Button>
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            label="Order Detail"
            value={orderDetail.order_message}
            variant="outlined"
          />
        </FormControl>
      </div>
    </>
  );
};
export default Icecream;
