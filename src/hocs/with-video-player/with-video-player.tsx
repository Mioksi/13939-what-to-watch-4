import * as React from 'react';
import {Subtract} from 'utility-types';

import {InjectingProps, IWithVideoPlayerState} from './types';

const withVideoPlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithVideoPlayer extends React.PureComponent<T, IWithVideoPlayerState> {
    constructor(props: T) {
      super(props);

      this.state = {
        isPlaying: false,
      };

      this.handleStartPlaying = this.handleStartPlaying.bind(this);
      this.handleStopPlaying = this.handleStopPlaying.bind(this);
    }

    private handleStartPlaying(): void {
      this.setState({
        isPlaying: true
      });
    }

    private handleStopPlaying(): void {
      this.setState({
        isPlaying: false
      });
    }

    public render(): React.ReactElement {
      const {isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          isPlaying={isPlaying}
          onStartPlaying={this.handleStartPlaying}
          onStopPlaying={this.handleStopPlaying}
        />
      );
    }
  }

  return WithVideoPlayer;
};

export default withVideoPlayer;
