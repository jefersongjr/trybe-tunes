import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { type, value, name, handleChange, test } = this.props;
    return (
      <input
        type={ type }
        name={ name }
        value={ value }
        onChange={ handleChange }
        data-testid={ test }
      />
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.string.isRequired,
  test: PropTypes.string.isRequired,
};

export default Input;
