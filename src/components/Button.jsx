import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { isDisabled, createUser } = this.props;
    return (
      <button
        type="button"
        onClick={ createUser }
        disabled={ isDisabled }
        data-testid="login-submit-button"
      >
        Entrar
      </button>
    );
  }
}

Button.propTypes = {
  createUser: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default Button;
