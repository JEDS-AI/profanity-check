import React from "react";
import { makeStyles } from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";
import CheckIcon from "@material-ui/icons/Check";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
  item: {
    display: "flex",
  },
  warningIcon: {
    color: "red",
  },
  checkIcon: {
    color: "green",
  },
}));

const ProfanityIndicator = (props) => {
  const { profanityResult, loading } = props;
  const classes = useStyles();

  if (loading) {
    return <CircularProgress />;
  }

  if (profanityResult.bad_words_total > 0) {
    return (
      <div className={classes.item}>
        <WarningIcon className={classes.warningIcon} />
        <div>There are bad words in your text</div>
      </div>
    );
  }
  if (profanityResult.bad_words_total === 0) {
    return (
      <div className={classes.item}>
        <CheckIcon className={classes.checkIcon} />
        <div>No bad words found</div>
      </div>
    );
  }

  return <div />;
};

ProfanityIndicator.defaultProps = {
  profanityResult: {},
};

export default React.memo(ProfanityIndicator);
