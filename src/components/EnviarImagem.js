import React from "react";
import ImageUploader from "react-images-upload";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  uploader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

class EnviarImagem extends React.Component {
  state = {
    imagem: null
  };

  onDrop = (pictures) => {
    this.props.onChange({imagem: pictures[0]});
  };

  render() {
    const { classes } = this.props;

    return <div className={classes.root}>
        <ImageUploader
                withIcon={true}
                withPreview={true}
                className={classes.uploader}
                buttonText='Escolha a foto do gabarito (JPG)'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.png']}
                maxFileSize={5242880}
            />
    </div>;
  }
}

export default withStyles(styles)(EnviarImagem);
