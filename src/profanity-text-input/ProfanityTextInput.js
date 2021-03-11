import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ProfanityIndicator from "./ProfanityIndicator";
import SubmitButton from "./SubmitButton";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(() => ({
  grid: {
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: 8,
  },
  bottomContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const ProfanityTextInput = () => {
  const classes = useStyles();
  const APIkey = "YOUR-API-KEY-HERE";
  const [loading, setLoading] = React.useState(false);
  const [profanityResult, setProfanityResult] = React.useState([]);
  const [text, setText] = React.useState("");

  useEffect(() => {
    if (profanityResult && profanityResult.censored_content) {
      const textWithNewLines = profanityResult.censored_content.replaceAll("+#*#+", "\n")
      setText(textWithNewLines)
    }
  }, [profanityResult]);

  const detectProfanity = async () => {
    const myHeaders = new Headers();
    myHeaders.append("apikey", APIkey);
    const textWithoutNewLines = text.replaceAll(/(\r\n|\n|\r)/gm, "+#*#+");
    return fetch("https://api.promptapi.com/bad_words?censor_character=*", {
      headers: myHeaders,
      method: "POST",
      body: textWithoutNewLines,
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => json);
      }
    });
  };

  const handleTextSubmit = async () => {
    setLoading(true);
    await detectProfanity().then((response) => {
      setProfanityResult(response);
      setLoading(false);
    });
  };

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <Grid container>
      <Grid item xs={4} />
      <Grid item xs={4} className={classes.grid}>
        <Paper className={classes.paper}>
          <TextField
            id="outlined-basic"
            label="Input"
            variant="outlined"
            onChange={onChange}
            value={text}
            multiline
            rows={10}
          />
          <div className={classes.bottomContainer}>
            <ProfanityIndicator
              profanityResult={profanityResult}
              loading={loading}
            />
            <SubmitButton onClick={handleTextSubmit} disabled={loading} />
          </div>
        </Paper>
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );
};

export default ProfanityTextInput;
