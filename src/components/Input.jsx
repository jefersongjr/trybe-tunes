import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { type, nameLogin, name, handleChange } = this.props;
    return (
      <input
        type={ type }
        name={ name }
        value={ nameLogin }
        onChange={ handleChange }
        data-testid="login-name-input"
      />
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  nameLogin: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.string.isRequired,
};

export default Input;
