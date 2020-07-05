import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import VideoPlayer from '../video-player/video-player.jsx';
import {VIDEO_DELAY} from '../../common/consts';

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };

    this._timeout = null;

    this._handleCartTitleClick = this._handleCartTitleClick.bind(this);
    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
    this._startPlaying = this._startPlaying.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this._timeout);
  }

  _startPlaying() {
    this.setState({
      isPlaying: true
    });
  }

  _stopPlaying() {
    clearTimeout(this._timeout);

    this.setState({
      isPlaying: false
    });

    this._timeout = null;
  }

  _handleCartTitleClick(id) {
    return (evt) => {
      const {onCardTitleClick} = this.props;

      evt.preventDefault();
      onCardTitleClick(id);
    };
  }

  _handleCardClick(id) {
    return () => {
      const {onCardClick} = this.props;

      onCardClick(id);
    };
  }

  _handleMouseEnter(id) {
    return () => {
      const {onCardMouseEnter} = this.props;

      this._timeout = setTimeout(this._startPlaying, VIDEO_DELAY);

      onCardMouseEnter(id);
    };
  }

  _handleMouseLeave() {
    const {onCardMouseLeave} = this.props;

    if (this._timeout) {
      this._stopPlaying();
    }

    onCardMouseLeave();
  }

  render() {
    const {isPlaying} = this.state;
    const {movie} = this.props;
    const {id, title, image, preview} = movie;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onClick={this._handleCardClick(id)}
        onMouseEnter={this._handleMouseEnter(id)}
        onMouseLeave={this._handleMouseLeave}
      >
        <div className="small-movie-card__image">
          <VideoPlayer
            isPlaying={isPlaying}
            src={preview}
            poster={image}
            muted={true}
          />
          <img src={image} alt={title} width="280" height="175"/>
        </div>
        <h3 className="small-movie-card__title">
          <a onClick={this._handleCartTitleClick(id)} className="small-movie-card__link" href="movie-page.html">{title}</a>
        </h3>
      </article>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
};

export default MovieCard;
