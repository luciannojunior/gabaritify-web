import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    flex: 1,
    justifyContent: "space-around"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 65
  }
});

class InfoGabarito extends React.Component {
  state = {
    nQuestoes: 10,
    respostas: {}
  };

  handleNumero = event => {
    this.setState(
      { ...this.state, nQuestoes: Number(event.target.value) },
      () => {
        this.props.onChange(this.state);
      }
    );
  };

  handleResposta = index => event => {
    this.setState(
      {
        ...this.state,
        respostas: { ...this.state.respostas, [index]: event.target.value }
      },
      () => {
        this.props.onChange(this.state);
      }
    );
  };

  render() {
    const { classes } = this.props;
    const { nQuestoes, respostas } = this.state;

    return (
      <div className={classes.root}>
        <TextField
          style={{
            borderRight: "0.7px solid black",
            padding: "0.5em",
            marginRight: 20
          }}
          id="select-currency"
          select
          label="Número de Questões"
          value={nQuestoes}
          onChange={this.handleNumero}
          helperText="E indique as respostas das questões:"
          margin="normal"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        {Array.apply(null, Array(nQuestoes)).map((_, i) => (
          <TextField
            id={`Q${i + 1}`}
            label={`Q${i + 1}`}
            select
            key={i}
            className={classes.textField}
            value={respostas[i] || ""}
            onChange={this.handleResposta(i)}
            margin="normal"
          >
            {["A", "B", "C", "D", ""].map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(InfoGabarito);
