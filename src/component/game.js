import React, { useState } from "react";
import { FormControl, FormLabel, Button, ButtonGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(4),
      left: theme.spacing(2),
    },
  },
}));
const Game = () => {
  const classes = useStyles();
  const generateRandom = () => {
    let values = [];
    let button_value_map = {};
    for (var i = 1; i < 8; i++) {
      let value = 1 + Math.floor(Math.random() * Math.floor(7));
      while (values.includes(value)) {
        value = 1 + Math.floor(Math.random() * Math.floor(7));
      }
      values.push(value);
      button_value_map[i] = value;
    }
    return button_value_map;
  };
  const [gameStatus, setValues] = useState({
    message: "Flip any card to start",
    clicked: [],
    next: -1,
    gameend: false,
    button_value_map: generateRandom(),
  });
  const get_button_color = (button) => {
    if ((gameStatus.next === -1) | (button === gameStatus.next)) {
      return "primary";
    } else if (gameStatus.clicked.includes(button)) {
      return "secondary";
    } else {
      return "default";
    }
  };
  const handleClick = (button_name) => {
    if (gameStatus.gameend) return;
    if ((gameStatus.next === -1) | (gameStatus.next === button_name)) {
      let clicked = gameStatus.clicked;
      clicked.push(button_name);
      console.log(clicked);
      let next_button = gameStatus.button_value_map[button_name];
      if (clicked.length >= 7) {
        setValues({
          ...gameStatus,
          message: "You have flipped all the cards. You win!!!",
          clicked: clicked,
          gameend: true,
          next: -2,
        });
      } else if (clicked.includes(next_button)) {
        setValues({
          ...gameStatus,
          message:
            "Card: " + next_button + " has already been flipped. You lost!!!",
          clicked: clicked,
          gameend: true,
          next: -2,
        });
      } else {
        setValues({
          ...gameStatus,
          message: "Next card to flip is " + next_button,
          next: next_button,
          clicked: clicked,
        });
      }
    }
  };
  const handlestartover = () => {
    setValues({
      message: "Click any button to start",
      clicked: [],
      next: -1,
      gameend: false,
      button_value_map: generateRandom(),
    });
  };
  return (
    <>
      <div className={classes.root}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{gameStatus.message}</FormLabel>
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color={get_button_color(1)} onClick={() => handleClick(1)}>
              One
            </Button>
            <Button color={get_button_color(2)} onClick={() => handleClick(2)}>
              Two
            </Button>
            <Button color={get_button_color(3)} onClick={() => handleClick(3)}>
              Three
            </Button>
            <Button color={get_button_color(4)} onClick={() => handleClick(4)}>
              Four
            </Button>
            <Button color={get_button_color(5)} onClick={() => handleClick(5)}>
              Five
            </Button>
            <Button color={get_button_color(6)} onClick={() => handleClick(6)}>
              Six
            </Button>
            <Button color={get_button_color(7)} onClick={() => handleClick(7)}>
              Seven
            </Button>
          </ButtonGroup>
        </FormControl>
      </div>
      {gameStatus.gameend ? (
        <div className={classes.root}>
          <Button variant="contained" color="primary" onClick={handlestartover}>
            Play Again
          </Button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default Game;
