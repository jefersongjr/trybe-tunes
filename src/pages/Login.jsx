import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { getUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    nameLogin: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });

    this.setState(() => ({
      isDisabled: true,
    }), this.validateButton);
  }

  validateButton = () => {
    const { nameLogin } = this.state;
    const number = 3;
    if (nameLogin.length >= number) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  render() {
    const { nameLogin, isDisabled } = this.state;
    return (
      <div data-testid="page-login">
        <Input
          type="text"
          name="nameLogin"
          value={ nameLogin }
          handleChange={ this.handleChange }
          data-testid="login-name-input"
        />
        <Button
          getUser={ getUser }
          isDisabled={ isDisabled }
          data-testid="login-submit-button"
        />
      </div>
    );
  }
}

export default Login;
