import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import Input from '../components/Input';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Card from '../components/Card';

class Search extends React.Component {
  state = {
    artist: '',
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
      artist: searchInput,
      searchInput: '',
      isLoading: false,
      colection: await searchAlbumsAPI(searchInput),
    });
  }

  render() {
    const { searchInput, isDisabled, isLoading, colection, artist } = this.state;
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

        { colection.length > 0
          ? (
            <section>
              <p>
                {`Resultado de álbuns de: ${artist} `}
              </p>
              <div id="albumSection">
                { colection.map((album) => (
                  <Link
                    key={ album.collectionName }
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                    className="albumLink"
                  >
                    <Card
                      image={ album.artworkUrl100 }
                      albumName={ album.collectionName }
                      singer={ album.artistName }
                    />
                  </Link>
                ))}
              </div>
            </section>)
          : (
            <p> Nenhum álbum foi encontrado </p>
          )}

      </div>
    );
  }
}

export default Search;

/* isLoading && <p> </p>;
artistId: 193507664
artistName: "Thiaguinho"
artworkUrl100: "https://is5-ssl.mzstatic.com/image/thumb/Music127/v4/98/1e/27/981e279c-0f9f-9dc3-e6aa-6c0f28e02692/7891430174477.jpg/100x100bb.jpg"
collectionId: 1248420200
collectionName: "Ainda Bem - Single"
collectionPrice: 1.29
releaseDate: "2017-06-16T07:00:00Z"
trackCount: 1
*/
