import React from 'react';
import { Link } from 'react-router-dom';
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
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Pesquisa</Link>
          <Link to="/profile" data-testid="link-to-profile">Pesquisa</Link>
        </nav>
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
