import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DataPopup from '../components/DataPopup.js';
import { T__ } from '../reducers/language.js';
import { close } from '../actions/dataPopupActions.js';

class DataPopupContainer extends Component {
  render() {
    const {
      searchQuery,
      close,
      visible,
      data
    } = this.props;

    if (!visible) {
      return <div />;
    }

    const popupHeader = T__('mapPage.dataPopup.header', data.length);
    const noDataText = T__('mapPage.dataPopup.noDataText');
    const rowClass = 'tweetText';

    return <DataPopup {...this.props}
      popupHeader = {popupHeader}
      noDataText = {noDataText}
      rowClass = {rowClass}
      onClose = {() => close()} />
  }
};

DataPopupContainer.propTypes = {
  data: PropTypes.array,
  visible: PropTypes.bool,
  point: PropTypes.object,
  noDataText: PropTypes.string
};

function mapStateToProps(state) {
  const { selectedTweets: data } = state.tweets;
  const { visible, point } = state.dataPopup;

  return {
    data,
    visible,
    point
  }
};

export default connect(
  mapStateToProps,
  { close }
)(DataPopupContainer);
