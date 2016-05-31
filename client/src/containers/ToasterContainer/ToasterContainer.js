import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toaster } from '../../components';
import * as toasterActions from '../../actions/toasterActions.js';

class ToasterContainer extends Component {
  render() {
    const {
      changeValue,
      ...props
    } = this.props;

    return <Toaster
      {...props}
      onClose={() => changeValue('visible', false)}
    />;
  }
}

function mapStateToProps(state) {
  return { ...state.toaster };
}

export default connect(
  mapStateToProps,
  {
    changeValue: toasterActions.changeValue
  }
)(ToasterContainer);
