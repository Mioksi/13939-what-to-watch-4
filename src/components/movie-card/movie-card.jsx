import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {ActionCreator} from '../../reducer/state/state';

import VideoPlayer from '../video-player/video-player.jsx';

import {VIDEO_DELAY} from '../../common/consts';

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

  _handleCartTitleClick(id) {
    return (evt) => {
      const {onCardClick} = this.props;

      evt.preventDefault();
      onCardClick(id);
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
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onStartPlaying: PropTypes.func.isRequired,
  onStopPlaying: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onCardClick(id) {
    dispatch(ActionCreator.getActiveFilmId(id));
  },
});

export {MovieCard};
export default connect(null, mapDispatchToProps)(MovieCard);
