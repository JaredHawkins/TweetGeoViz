import React, { Component, PropTypes } from 'react';

class DropDown extends Component {
  render() {
    const {
      name,
      onChange,
      data,
      firstDefaultItem,
      id,
      selectedValue,
      dataKey = 'id',
      dataName = 'name',
      dataValue = 'value'
    } = this.props;

    return (
      <select name={name}
        className="form-control"
        value={selectedValue}
        onChange={onChange}
        id={id}
      >
        {
          firstDefaultItem
          ? <option value="" key="">{firstDefaultItem}</option>
          : null
        }
        {data.map(item =>
          <option
            key={item[dataKey] || item[dataValue]}
            value={item[dataValue]}
          >
            {item[dataName]}
          </option>
        )}
      </select>
    );
  }
}

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  dataKey: PropTypes.string,
  dataValue: PropTypes.string,
  dataName: PropTypes.string,
  firstDefaultItem: PropTypes.string,
  id: PropTypes.string,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default DropDown;
