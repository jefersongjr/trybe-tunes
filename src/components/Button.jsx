import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { isDisabled, getUser } = this.props;
    return (
      <button
        type="button"
        onClick={ getUser }
        disabled={ isDisabled }
      >
        Entrar
      </button>
    );
  }
}

Button.propTypes = {
  getUser: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default Button;
