import * as React from 'react';
import {Subtract} from 'utility-types';
import {connect} from 'react-redux';

import {Time, VIDEO_CLASS} from '../../common/consts';
import {getSelectedFilm} from '../../reducer/state/selectors';
import {InjectedProps, IWithFullScreenPlayerProps, IWithFullScreenPlayerState} from './types';

const withFullScreenPlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = IWithFullScreenPlayerProps & Subtract<P, InjectedProps>;

  class WithFullScreenPlayer extends React.PureComponent<T, IWithFullScreenPlayerState> {
    private readonly videoRef: React.RefObject<HTMLVideoElement>;

    constructor(props: T) {
      super(props);

      this.videoRef = React.createRef();

      this.state = {
        isPlaying: false,
        duration: 0,
        progress: 0
      };

      this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
      this.handlePause = this.handlePause.bind(this);
      this.handlePlay = this.handlePlay.bind(this);
      this.handleCanPlayThrough = this.handleCanPlayThrough.bind(this);
      this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);
      this.handleFullScreenSet = this.handleFullScreenSet.bind(this);
    }

    componentDidMount(): void {
      const video = this.videoRef.current;
      const {film} = this.props;

      if (video) {
        video.src = film[`video_link`];

        video.play();

        video.oncanplaythrough = this.handleCanPlayThrough;
        video.onplay = this.handlePlay;
        video.onpause = this.handlePause;
        video.ontimeupdate = this.handleTimeUpdate;
      }
    }

    componentWillUnmount(): void {
      const video = this.videoRef.current;

      if (video) {
        video.src = ``;

        video.oncanplaythrough = null;
        video.onplay = null;
        video.onpause = null;
        video.ontimeupdate = null;
        video.controls = false;
      }
    }

    componentDidUpdate(): void {
      const video = this.videoRef.current;

      if (video) {
        if (this.state.isPlaying) {
          video.play();
        } else {
          video.pause();
        }
      }
    }

    private handleCanPlayThrough(): void {
      const video = this.videoRef.current;

      if (video) {
        this.setState({
          duration: video.duration,
        });
      }
    }

    private handlePlay(): void {
      this.setState({
        isPlaying: true,
      });
    }

    private handlePause(): void {
      this.setState({
        isPlaying: false,
      });
    }

    private handleTimeUpdate(): void {
      const video = this.videoRef.current;

      if (video) {
        video.ontimeupdate = () => {
          this.setState({
            progress: Math.floor(video.currentTime)
          });
        };
      }
    }

    private handlePlayButtonClick(): void {
      this.setState((prevState) => {
        return {
          isPlaying: !prevState.isPlaying,
          duration: prevState.duration,
          progress: prevState.progress,
        };
      });
    }

    private handleFullScreenSet(): void {
      const video = this.videoRef.current;

      if (video) {
        if (video.webkitEnterFullScreen) {
          video.webkitEnterFullScreen();
        } else {
          video.requestFullscreen();
          video.controls = true;
        }
      }
    }

    private getElapsedTime(): string {
      const {progress, duration} = this.state;

      const difference = duration - progress;

      const hours = Math.trunc(difference / Time.SECONDS_IN_HOUR);
      const minutes = Math.trunc(difference / Time.SECONDS_IN_MINUTE);
      const seconds = Math.trunc(difference % Time.SECONDS_IN_MINUTE);

      return `${hours}:${minutes}:${seconds}`;
    }

    public render(): React.ReactElement {
      const {isPlaying, progress, duration} = this.state;
      const {film} = this.props;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          elapsedTime={this.getElapsedTime()}
          name={film.name}
          onPlayButtonClick={this.handlePlayButtonClick}
          onFullScreenButtonClick={this.handleFullScreenSet}
        >
          <video
            ref={this.videoRef}
            className={VIDEO_CLASS}
            poster={film[`background_image`]}
          >
            <source src={film[`video_link`]}/>
          </video>
        </Component>
      );
    }
  }

  const mapStateToProps = (state, props): IWithFullScreenPlayerProps => ({
    film: getSelectedFilm(state, props.id)
  });

  return connect(mapStateToProps)(WithFullScreenPlayer);
};

export default withFullScreenPlayer;
