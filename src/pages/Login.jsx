import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Button from '../components/Button';
import Input from '../components/Input';
import Loading from '../components/Loading';

class Login extends React.Component {
  state = {
    nameLogin: '',
    isDisabled: true,
    isLoading: false,
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

  buttonFuction = async () => {
    this.setState({
      isLoading: true,
    });
    const { history } = this.props;
    const { nameLogin } = this.state;
    await createUser({ name: nameLogin });

    history.push('/search');
  }

  render() {
    const { nameLogin, isDisabled, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        { isLoading
          ? <Loading />
          : (
            <div>
              <Input
                type="text"
                name="nameLogin"
                value={ nameLogin }
                test="login-name-input"
                handleChange={ this.handleChange }
              />
              <Button
                test="login-submit-button"
                handleButton={ this.buttonFuction }
                isDisabled={ isDisabled }
              />
            </div>)}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};
export default Login;
