import React, { Component, PropTypes } from 'react';
import Snackbar from 'material-ui/lib/snackbar';

class Toaster extends Component {
  render() {
    return <Snackbar
      open={this.props.visible}
      message={this.props.message}
      autoHideDuration={this.props.duration}
      onRequestClose={this.props.onClose}
    />;
  }
}

export default Toaster;
