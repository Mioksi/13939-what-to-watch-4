import React, {PureComponent} from 'react';

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
      };

      this.handleStartPlaying = this.handleStartPlaying.bind(this);
      this.handleStopPlaying = this.handleStopPlaying.bind(this);
    }

    handleStartPlaying() {
      this.setState({
        isPlaying: true
      });
    }

    handleStopPlaying() {
      this.setState({
        isPlaying: false
      });
    }

    render() {
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
