import React from 'react';
import { Link } from 'react-router-dom';
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
    this.setState({
      searchInput: '',
      isLoading: true,
    });
    const { searchInput } = this.state;

    this.setState({
      searchInput: '',
      isLoading: false,
      colection: await searchAlbumsAPI(searchInput),
    });
  }

  render() {
    const { searchInput, isDisabled, isLoading, colection } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { isLoading
          ? (
            <Loading />
          )
          : (
            <div>

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
                  handleButton={ this.handleClick }
                  isDisabled={ isDisabled }
                />
              </form>
            </div>
          ) }

        <div>
          { colection.length > 0
            && (
              <p>
                Resultado de álbuns de:
                { searchInput }
              </p>)}
          { colection.map((album) => (
            <Link
              key={ album.collectionName }
              to={ `/album/:${album.collectionName}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              <p key={ album.collectionName }>
                { album.collectionName }
              </p>
              )
            </Link>
          ))}
        </div>

      </div>
    );
  }
}

export default Search;

// isLoading && <p> </p>;
