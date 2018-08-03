import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InfoGabarito from './InfoGabarito';
import EnviarImagem from './EnviarImagem';
import axios from 'axios';
import Resultado from './Resultado';


const styles = theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Indique os dados sobre o exame', 'Envie a imagem do gabarito', 'Resultado'];
}

function getStepContent(step, onChange) {
  switch (step) {
    case 0:
      return (<InfoGabarito onChange={onChange}/>);
    case 1:
      return (<EnviarImagem onChange={onChange}/>);
    case 2:
      return (<Resultado/>)
    default:
      return 'Unknown step';
  }
}

class GabaritoStepper extends React.Component {
  state = {
    activeStep: 0,
    completed: {},
    loading: false
  };

  totalSteps = () => {
    return getSteps().length;
  };

  handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = getSteps();
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      activeStep = this.state.activeStep + 1;
      if (activeStep === 2){
        this.setState({...this.state, loading: true});
        return this.enviarDados().then((resposta)=>{
          return this.setState({
            activeStep,
            loading: false,
            gabarito: resposta.data
          });
        });
      }
      this.setState({
        activeStep
      });
    }
    
  };

  enviarDados = () => {
    console.log(this.state);
    let data = new FormData();
    data.append('imagem', this.state.imagem, this.state.imagem.name);
    data.append('respostas', Object.values(this.state.respostas).join(''));

    return axios.post('http://localhost:5000/upload', data, { headers:  { 'content-type': 'multipart/form-data'}});
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  };

  handleComplete = () => {
    const { completed } = this.state;
    completed[this.state.activeStep] = true;
    this.setState({
      completed,
    });
    this.handleNext();
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {},
    });
  };

  completedSteps() {
    return Object.keys(this.state.completed).length;
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps();
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepButton
                  onClick={this.handleStep(index)}
                  completed={this.state.completed[index]}
                >
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.allStepsCompleted() ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&quot;re finished
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
                {getStepContent(activeStep, (childState) => {
                  this.setState({...this.state, ...childState});
                })}
              <Typography className={classes.instructions}></Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Voltar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  Próximo
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

GabaritoStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(GabaritoStepper);