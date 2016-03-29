import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { T__ } from '../../reducers/language.js';
import { DataPopup } from '../../components';
import * as dataPopupActions from '../../actions/dataPopupActions.js';

class DataPopupContainer extends Component {
  render() {
    const {
      close,
      visible,
      data
    } = this.props;

    if (!visible) {
      return <div />;
    }

    const popupHeader = T__('mapPage.dataPopup.header', data.length);
    const noDataText = T__('mapPage.dataPopup.noDataText');

    return <DataPopup {...this.props}
      popupHeader={popupHeader}
      noDataText={noDataText}
      onClose={close}
    />;
  }
}

DataPopupContainer.propTypes = {
  data: PropTypes.array,
  visible: PropTypes.bool,
  point: PropTypes.object,
  noDataText: PropTypes.string,
  close: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedTweets: data } = state.tweets;
  const { visible, point } = state.dataPopup;

  return {
    data,
    visible,
    point
  };
}

export default connect(
  mapStateToProps,
  {
    close: dataPopupActions.close
  }
)(DataPopupContainer);
