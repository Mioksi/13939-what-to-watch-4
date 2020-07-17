import React, {PureComponent, createRef} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {VIDEO_CLASS} from '../../common/consts';

const withFullScreenPlayer = (Component) => {
  class WithFullScreenPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();

      this.state = {
        isPlaying: false,
        duration: 0,
        progress: 0
      };

      this._handleTimeUpdate = this._handleTimeUpdate.bind(this);
      this._handlePause = this._handlePause.bind(this);
      this._handlePlay = this._handlePlay.bind(this);
      this._handleCanPlayThrough = this._handleCanPlayThrough.bind(this);
      this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
      this._handleFullScreenSet = this._handleFullScreenSet.bind(this);
    }

    componentDidMount() {
      const video = this._videoRef.current;
      const {film} = this.props;

      if (video) {
        video.src = film.src;

        video.play();

        video.oncanplaythrough = this._handleCanPlayThrough;
        video.onplay = this._handlePlay;
        video.onpause = this._handlePause;
        video.ontimeupdate = this._handleTimeUpdate;
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      if (video) {
        video.src = ``;

        video.oncanplaythrough = null;
        video.onplay = null;
        video.onpause = null;
        video.ontimeupdate = null;
      }
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (video) {
        if (this.state.isPlaying) {
          video.play();
        } else {
          video.pause();
        }
      }
    }

    _handleCanPlayThrough() {
      const video = this._videoRef.current;

      if (video) {
        this.setState({
          duration: video.duration,
        });
      }
    }

    _handlePlay() {
      this.setState({
        isPlaying: true,
      });
    }

    _handlePause() {
      this.setState({
        sPlaying: false,
      });
    }

    _handleTimeUpdate() {
      const video = this._videoRef.current;

      if (video) {
        video.ontimeupdate = () => {
          this.setState({
            progress: Math.floor(video.currentTime)
          });
        };
      }
    }

    _handlePlayButtonClick() {
      this.setState((prevState) => {
        return {
          isPlaying: !prevState.isPlaying,
          duration: prevState.duration,
          progress: prevState.progress,
        };
      });
    }

    _handleFullScreenSet() {
      const video = this._videoRef.current;

      if (video) {
        video.requestFullscreen();
      }
    }

    render() {
      const {isPlaying, progress, duration} = this.state;
      const {film} = this.props;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          onPlayButtonClick={this._handlePlayButtonClick}
          onFullScreenButtonClick={this._handleFullScreenSet}
        >
          <video
            ref={this._videoRef}
            className={VIDEO_CLASS}
            src={film.src}
            poster={film.backgroundPoster}
          />
        </Component>
      );
    }
  }

  WithFullScreenPlayer.propTypes = {
    film: PropTypes.shape({
      src: PropTypes.string.isRequired,
      backgroundPoster: PropTypes.string.isRequired,
    }).isRequired,
  };

  const mapStateToProps = (state) => ({
    film: state.film,
  });

  return connect(mapStateToProps)(WithFullScreenPlayer);
};

export default withFullScreenPlayer;
