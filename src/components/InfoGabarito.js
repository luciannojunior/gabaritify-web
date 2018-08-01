import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'space-around'
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

export default withStyles(styles)(({classes}) => (
  <div className={classes.root}>
    <Grid container spacing={8}>
      <Grid item xs={12} container spacing={24}>
        <TextField
          style={{
            borderRight: "0.7px solid black",
            padding: "0.5em"
          }}
          id="select-currency"
          select
          label="Número de Questões"
          value={10}
          onChange={() => {}}
          helperText="Por favor, selecione o número de questões da prova"
          margin="normal"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} container spacing={24} />
      <Grid item xs={12} container spacing={24} />
    </Grid>
    <Typography style={{ flex: 1 }}>
      Agora, selecione as respostas das questões
    </Typography>
  </div>
));
