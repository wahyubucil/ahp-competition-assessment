import React, { useState } from "react";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import config from "./config";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh"
  }
}));

function App() {
  const classes = useStyles();
  const [ranks, setRanks] = useState([]);

  const handleOnFormSubmitted = async teams => {
    const result = await axios.post(`${config.apiHost}/ranks`, {
      teams
    });
    setRanks(result.data);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container spacing={0} className={classes.root}>
        <Grid item xs={6}>
          <LeftPanel onFormSubmitted={handleOnFormSubmitted} />
        </Grid>
        <Grid item xs={6}>
          <RightPanel ranks={ranks} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default App;
