import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';

const withFullScreenPlayer = (Component) => {
  class WithFullScreenPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();

      this.state = {
        isPlaying: false,
        duration: 0,
        progress: 0,
      };

      this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
      this._handleFullScreenSet = this._handleFullScreenSet.bind(this);
    }

    componentDidMount() {
      const video = this._videoRef.current;
      const {src} = this.props;

      if (video) {
        video.src = src;

        video.play();
        video.oncanplaythrough = () => this._handleCanPlayThrough();
        video.onplay = () => this._handlePlay();
        video.onpause = () => this._handlePause();
        video.ontimeupdate = () => this._handleTimeUpdate();
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

      this.setState({
        duration: video.duration,
      });
    }

    _handlePlay() {
      this.setState({
        isPlaying: true,
      });
    }

    _handlePause() {
      this.setState({
        isPlaying: false,
      });
    }

    _handleTimeUpdate() {
      const video = this._videoRef.current;

      this.setState({
        progress: Math.floor(video.currentTime)
      });
    }

    _handlePlayButtonClick() {
      this.setState((prevState) => {
        return {isPlaying: !prevState.isPlaying};
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
      const {poster, src} = this.props;
      const videoClass = `player__video`;

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
            className={videoClass}
            src={src}
            poster={poster}
          />
        </Component>
      );
    }
  }

  WithFullScreenPlayer.propTypes = {
    src: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
  };

  return WithFullScreenPlayer;
};

export default withFullScreenPlayer;
