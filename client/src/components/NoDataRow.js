import React, { Component, PropTypes } from 'react';

class NoDataRow extends Component {
  render() {
    const {
      rowClass,
      noDataText
    } = this.props;

    return (
      <li>
        <div className={rowClass}>
          <span> {noDataText} </span>
        </div>
      </li>
    );
  }
};

NoDataRow.propTypes = {
  rowClass: PropTypes.string,
  noDataText: PropTypes.string
};

export default NoDataRow;
