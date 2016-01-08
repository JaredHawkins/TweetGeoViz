import React, { Component, PropTypes } from 'react';

class DropDown extends Component {
  static propTypes = {
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
        value={selectedValue}
        className='form-control'
        onChange={onChange}
        id={id}
      >
        {
          firstDefaultItem
          ? <option value='' key=''>{firstDefaultItem}</option>
          : null
        }
        {data.map(item =>
          <option
            key={item[dataKey] || item[dataValue]}
            value={item[dataValue]}>
              {item[dataName]}
          </option>
        )}
      </select>
    );
  }
};

export default DropDown;
