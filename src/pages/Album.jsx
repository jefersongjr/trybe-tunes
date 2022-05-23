import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state ={
    infoAlbum: '',
    infoArtist: {},
    album: [],
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

    const tracks = infoAlbum.filter((musics) => musics.previewUrl);

    this.setState({
      infoArtist: infos,
      album: tracks,
    });
  }

  fetchUrlId = () => {
    const { match } = this.props;
    return match.params.id;
  }

  render() {
    const { infoArtist, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
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
                  previewUrl={ track.previewUrl }
                />
              </div>
            ))}
          </section>
        </main>
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
