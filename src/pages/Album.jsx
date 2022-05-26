import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  state = {
    infoAlbum: '',
    infoArtist: {},
    album: [],
    favoriteMusics: '',
    isLoading: false,
  }

  async componentDidMount() {
    this.setState({
      infoAlbum: await getMusics(this.fetchUrlId()),
    });

    const { infoAlbum } = this.state;
    const infos = {
      artistName: infoAlbum[0].artistName,
      collectionName: infoAlbum[0].collectionName,
      artworkUrl60: infoAlbum[0].artworkUrl60 };

    const tracks = infoAlbum.filter((musics) => musics.kind === 'song');
    const track1 = tracks.map((object) => ({ ...object, checked: false }));

    this.setState({
      infoArtist: infos,
      album: [...track1],
    });
  }

  fetchUrlId = () => {
    const { match } = this.props;
    return match.params.id;
  }

  handleFavorite = async ({ target }) => {
    const { name } = target;
    const { album, favoriteMusics } = this.state;
    this.setState({
      isLoading: true,
    });

    album.forEach((object) => {
      if (`${object.trackId}` === `${JSON.parse(name).trackId}`) {
        object.checked = !object.checked;
      }
    });

    console.log(favoriteMusics);
    const x = album.filter((object) => object.checked === true);
    if (x.length > 0) {
      await addSong(...x);
    }

    this.setState({
      favoriteMusics: await getFavoriteSongs(),
      isLoading: false,
    });
  };

  render() {
    const { infoArtist, album, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { isLoading ? (
          <Loading />)
          : (
            <main id="preview-album">
              <section id="albumInfo">
                <div className="image-card">
                  <img
                    src={ infoArtist.artworkUrl60 }
                    alt={ infoArtist.collectionName }
                  />
                </div>
                <h3 data-testid="album-name">
                  { infoArtist.collectionName}
                </h3>
                <p data-testid="artist-name">
                  { infoArtist.artistName}
                </p>
              </section>

              <section id="section-preview-music">
                { album.map((track) => (
                  <div key={ track.trackName }>
                    <span>
                      { track.trackName }
                    </span>
                    <MusicCard
                      track={ track }
                      previewUrl={ track.previewUrl }
                      test={ `checkbox-music-${track.trackId}` }
                      trackId={ track.trackId }
                      checked={ track.checked }
                      handleFavorite={ this.handleFavorite }
                    />
                  </div>
                ))}
              </section>
            </main>)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};

export default Album;
