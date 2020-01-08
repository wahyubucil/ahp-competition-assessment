import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { styled, makeStyles } from "@material-ui/core/styles";

const MainTitle = styled("h1")({
  color: "#389aea",
  position: "absolute",
  top: 0
});

const useStyles = makeStyles(theme => ({
  root: {
    alignContent: "center",
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    paddingLeft: "32px",
    paddingRight: "32px"
  },
  formItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px"
  },
  textField: {
    width: "23%"
  },
  addButton: {
    marginBottom: 16
  },
  submitButton: {
    marginTop: 16
  }
}));

function LeftPanel({ onFormSubmitted }) {
  const classes = useStyles();
  const [teams, setTeams] = useState([
    {
      name: "",
      ideaValidation: 0,
      pitchDeck: 0,
      prototype: 0
    }
  ]);

  const handleAddButtonClick = e => {
    e.preventDefault();
    const team = {
      name: "",
      ideaValidation: 0,
      pitchDeck: 0,
      prototype: 0
    };
    setTeams([...teams, team]);
  };

  const handleTextFieldChange = (e, index, key, isNumber = false) => {
    const theTeams = [...teams];
    const team = theTeams[index];
    team[key] = isNumber ? Number(e.target.value) : e.target.value;
    setTeams(theTeams);
  };

  const submitForm = e => {
    e.preventDefault();
    onFormSubmitted(teams);
  };

  return (
    <div className={classes.root}>
      <MainTitle>Startup Competition Assessment</MainTitle>

      <Button
        variant="outlined"
        color="secondary"
        className={classes.addButton}
        onClick={handleAddButtonClick}
      >
        Add team
      </Button>

      <form noValidate autoComplete="off" onSubmit={submitForm}>
        {teams.map((team, index) => (
          <div className={classes.formItem} key={index.toString()}>
            <TextField
              label="Team Name"
              variant="outlined"
              type="name"
              size="small"
              className={classes.textField}
              defaultValue={team.name}
              onChange={e => handleTextFieldChange(e, index, "name")}
              required
            />

            <TextField
              label="Idea Validation"
              variant="outlined"
              type="number"
              size="small"
              className={classes.textField}
              defaultValue={team.ideaValidation}
              onChange={e =>
                handleTextFieldChange(e, index, "ideaValidation", true)
              }
              required
            />

            <TextField
              label="Pitch Deck"
              variant="outlined"
              type="number"
              size="small"
              className={classes.textField}
              defaultValue={team.pitchDeck}
              onChange={e => handleTextFieldChange(e, index, "pitchDeck", true)}
              required
            />

            <TextField
              label="Prototype"
              variant="outlined"
              type="number"
              size="small"
              className={classes.textField}
              defaultValue={team.prototype}
              onChange={e => handleTextFieldChange(e, index, "prototype", true)}
              required
            />
          </div>
        ))}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.submitButton}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default LeftPanel;
