import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { previewUrl, test, trackId, handleFavorite, checked } = this.props;
    return (
      <div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            name={ trackId }
            type="checkbox"
            data-testid={ test }
            checked={ checked }
            onChange={ handleFavorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  test: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
