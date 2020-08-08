import * as React from 'react';

import {IVideoPlayerProps} from './types';

import {VIDEO_CLASS} from '../../common/consts';

class VideoPlayer extends React.PureComponent<IVideoPlayerProps> {
  private readonly videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props: IVideoPlayerProps) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount(): void {
    const {src, poster, muted} = this.props;
    const video = this.videoRef.current;

    if (video) {
      video.src = src;
      video.poster = poster;
      video.muted = muted;
    }
  }

  componentWillUnmount(): void {
    const video = this.videoRef.current;

    if (video) {
      video.onplay = null;
      video.muted = null;
      video.src = ``;
      video.poster = ``;
    }
  }

  componentDidUpdate(): void {
    const video = this.videoRef.current;

    if (video) {
      if (this.props.isPlaying) {
        video.play();
      } else {
        video.load();
      }
    }
  }

  public render(): React.ReactElement {
    const {src, poster, muted} = this.props;

    return (
      <video
        ref={this.videoRef}
        className={VIDEO_CLASS}
        src={src}
        poster={poster}
        muted={muted}
      />
    );
  }
}

export default VideoPlayer;
