import React from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import Input from '../components/Input';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    searchInput: '',
    isDisabled: true,
    isLoading: false,
    colection: [],
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

  handleClick = async () => {
    const { pesquisa, colection } = this.state;

    this.setState({
      pesquisa: '',
      isLoading: true,
      colection: [...colection, await searchAlbumsAPI(pesquisa)],
    });
  }

  render() {
    const { searchInput, isDisabled, isLoading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { isLoading
          ? (
            <Loading />
          )
          : (
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
                handleButton={ this.handleClick() }
                isDisabled={ isDisabled }
              />
            </form>) }
      </div>
    );
  }
}

export default Search;
