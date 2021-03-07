import React from "react";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
}));

const SubmitButton = (props) => {
  const { onClick, disabled } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        disabled={disabled}
      >
        Submit
      </Button>
    </div>
  );
};

export default SubmitButton;
