import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { previewUrl } = this.props;
    return (
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>audio</code>
      </audio>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;
