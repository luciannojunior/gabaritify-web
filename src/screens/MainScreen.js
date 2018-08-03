import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GabaritoStepper from '../components/GabaritoStepper';

const styles = {
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
};

function MainScreen(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography noWrap>{'Seja bem-vindo! Siga os passos para efetuar a correção do gabarito'}</Typography>
      <GabaritoStepper/>
    </div>
  );
}

MainScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainScreen);