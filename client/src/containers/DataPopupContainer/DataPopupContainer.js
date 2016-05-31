import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { T__ } from '../../reducers/language.js';
import { DataPopup } from '../../components';
import * as dataPopupActions from '../../actions/dataPopupActions.js';

class DataPopupContainer extends Component {
  render() {
    const {
      close,
      changeValue,
      ...props
    } = this.props;

    return <DataPopup
      {...props}
      popupHeader={T__('mapPage.dataPopup.header', props.data.length)}
      noDataText={T__('mapPage.dataPopup.noDataText')}
      onClose={close}
      onChange={changeValue}
    />;
  }
}

function mapStateToProps(state) {
  const { filterText } = state.dataPopup;
  const { selectedTweets } = state.tweets;

  const data = filterText.length
    ? selectedTweets.filter(tweet => tweet.text.indexOf(filterText) >= 0)
    : selectedTweets;

  return {
    ...state.dataPopup,
    data
  };
}

export default connect(
  mapStateToProps,
  {
    close: dataPopupActions.close,
    changeValue: dataPopupActions.changeValue
  }
)(DataPopupContainer);
