import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import VideoPlayer from '../video-player/video-player.jsx';

import {AppRoute, VIDEO_DELAY} from '../../common/consts';

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._timeout = null;

    this._handleMouseLeave = this._handleMouseLeave.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this._timeout);
  }

  _stopPlaying() {
    const {onStopPlaying} = this.props;

    clearTimeout(this._timeout);

    this._timeout = null;

    onStopPlaying();
  }

  _handleMouseEnter(id) {
    return () => {
      const {onCardMouseEnter, onStartPlaying} = this.props;

      this._timeout = setTimeout(onStartPlaying, VIDEO_DELAY);

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
    const {movie, isPlaying} = this.props;
    const {id, name, [`preview_image`]: image, [`preview_video_link`]: preview} = movie;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this._handleMouseEnter(id)}
        onMouseLeave={this._handleMouseLeave}
      >
        <Link to={`${AppRoute.FILM}/${id}`}>
          <div className="small-movie-card__image">
            <VideoPlayer
              isPlaying={isPlaying}
              src={preview}
              poster={image}
              muted={true}
            />
            <img src={image} alt={name} width="280" height="175"/>
          </div>
        </Link>
        <h3 className="small-movie-card__title">
          <Link to={`${AppRoute.FILM}/${id}`} className="small-movie-card__link">{name}</Link>
        </h3>
      </article>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    [`preview_image`]: PropTypes.string.isRequired,
    [`preview_video_link`]: PropTypes.string.isRequired,
  }).isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onStartPlaying: PropTypes.func.isRequired,
  onStopPlaying: PropTypes.func.isRequired,
};

export default MovieCard;
