import React, { Component, PropTypes } from 'react';

class NoDataRow extends Component {
  render() {
    return (
      <li>
        <div className={this.props.rowClass}>
          <span>{this.props.noDataText}</span>
        </div>
      </li>
    );
  }
}

NoDataRow.propTypes = {
  rowClass: PropTypes.string,
  noDataText: PropTypes.string
};

export default NoDataRow;
