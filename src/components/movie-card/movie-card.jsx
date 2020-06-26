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
  }

  _handleCartTitleClick(evt) {
    const {movie, onCardTitleClick} = this.props;
    const {id} = movie;

    evt.preventDefault();
    onCardTitleClick(id);
  }

  _handleCardClick() {
    const {movie, onCardClick} = this.props;
    const {id} = movie;

    onCardClick(id);
  }

  _handleMouseEnter() {
    const {movie, onCardMouseEnter} = this.props;
    const {id} = movie;

    this._timeout = setTimeout(() =>
      this.setState({
        isPlaying: true
      }), VIDEO_DELAY);

    onCardMouseEnter(id);
  }

  _handleMouseLeave() {
    const {onCardMouseLeave} = this.props;

    if (this._timeout) {
      clearTimeout(this._timeout);

      this.setState({
        isPlaying: false
      });

      this._timeout = null;
    }

    onCardMouseLeave();
  }

  render() {
    const {isPlaying} = this.state;
    const {movie} = this.props;
    const {title, image, preview} = movie;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onClick={this._handleCardClick}
        onMouseEnter={this._handleMouseEnter}
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
          <a onClick={this._handleCartTitleClick} className="small-movie-card__link" href="movie-page.html">{title}</a>
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
