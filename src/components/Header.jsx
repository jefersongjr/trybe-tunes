import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state ={
    user: '',
    isLoading: false,
  }

  async componentDidMount() {
    this.setState({
      isLoading: true,
      user: await getUser(),
    });
  }

  render() {
    const { user, isLoading } = this.state;
    return (
      <header
        data-testid="header-component"
        onChange={ this.getUser1 }
      >
        { isLoading
          ? (
            <p data-testid="header-user-name">
              { user.name }
            </p>)
          : (
            <Loading />
          ) }
      </header>
    );
  }
}

export default Header;
