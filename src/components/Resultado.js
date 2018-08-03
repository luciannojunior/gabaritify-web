import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "../../node_modules/@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },
  uploader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

class Resultado extends React.Component {
  render() {
    const { classes, gabarito, respostas, nQuestoes } = this.props;

    console.log(respostas);

    const mapResposta = (numero) => {
        switch (numero) {
            case 0:
                return 'A';
            case 1:
                return 'B';
            case 2:
                return 'C';
            case 3:
                return 'D'
            default:
                return numero;
        }
    };

    let acertos = 0;

    gabarito.map(mapResposta).forEach((q, i) => {
        if (respostas[i] === q) acertos++
    });

    const strResposta = Object.values(respostas).join(' ');
    const strGabarito = gabarito.map(mapResposta).join(' ');


    return <div className={classes.root}>
        <Typography variant="title" gutterBottom align="center">
            O acerto foi de {(acertos/nQuestoes * 100).toFixed(2)}% das respostas. ({acertos} de {nQuestoes})
        </Typography>
        <Typography variant="subheading" gutterBottom align="center">
            O gabarito tem as respostas {strResposta}
        </Typography>
        <Typography variant="subheading" gutterBottom align="center">
            As respostas certas são: {strGabarito}
        </Typography>
    </div>;
  }
}

export default withStyles(styles)(Resultado);
