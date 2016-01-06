import React, { Component, PropTypes } from 'react';

class DataPopupRow extends Component {
  render() {
    const {
      text,
      rowClass
    } = this.props;

    return (
      <li>
        <div className={rowClass}>
          <span dangerouslySetInnerHTML={{__html: text }}></span>
        </div>
      </li>
    );
  }
};

DataPopupRow.propTypes = {
  text: PropTypes.string,
  rowClass: PropTypes.string
};

export default DataPopupRow;
