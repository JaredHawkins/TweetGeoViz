import React, { Component, PropTypes } from 'react';

class DataPopupRow extends Component {
  render() {
    return (
      <li>
        <div className={this.props.rowClass}>
          {
            this.props.showTimeStamps ?
            <p className="text-primary">
              {new Date(this.props.timeStamp).toUTCString()}
            </p>
            : null
          }
          <span dangerouslySetInnerHTML={{__html: this.props.text }}></span>
        </div>
      </li>
    );
  }
}

DataPopupRow.propTypes = {
  text: PropTypes.string,
  rowClass: PropTypes.string
};

export default DataPopupRow;
