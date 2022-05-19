import React from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import Input from '../components/Input';

class Search extends React.Component {
  state = {
    searchInput: '',
    isDisabled: true,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });

    this.setState(() => ({
      isDisabled: true,
    }), this.validateButton);
  }

  validateButton = () => {
    const { searchInput } = this.state;
    const number = 2;
    if (searchInput.length >= number) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  render() {
    const { searchInput, isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <Input
            type="text"
            name="searchInput"
            value={ searchInput }
            test="search-artist-input"
            handleChange={ this.handleChange }
          />
          <Button
            test="search-artist-button"
            handleButton={ this.buttonFuction }
            isDisabled={ isDisabled }
          />
        </form>
      </div>
    );
  }
}

export default Search;
