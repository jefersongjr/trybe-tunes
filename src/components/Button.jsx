import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { isDisabled, handleButton, test } = this.props;
    return (
      <button
        type="button"
        onClick={ handleButton }
        disabled={ isDisabled }
        data-testid={ test }
      >
        Entrar
      </button>
    );
  }
}

Button.propTypes = {
  handleButton: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  test: PropTypes.string.isRequired,

};

export default Button;
