import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const { image, albumName, singer } = this.props;
    return (
      <div className="Card">
        <div>
          <img src={ image } alt="capa do album" />
        </div>
        <p>
          { albumName }
        </p>
        <p>
          { singer }
        </p>
      </div>
    );
  }
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  singer: PropTypes.string.isRequired,
};

export default Card;
