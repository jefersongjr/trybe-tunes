import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state ={
    infoAlbum: '',
    infoArtist: {},
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

    this.setState({
      infoArtist: infos,
    });
  }

  fetchUrlId = () => {
    const { match } = this.props;
    return match.params.id;
  }

  render() {
    const { infoArtist } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <img src={ infoArtist.artworkUrl60 } alt="" />
          <h3 data-testid="album-name">
            { infoArtist.collectionName}
          </h3>
          <p data-testid="artist-name">
            { infoArtist.artistName}
          </p>
        </section>

        <section>
          <MusicCard />
        </section>
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
