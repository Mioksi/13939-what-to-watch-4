import React from 'react';
import PropTypes from 'prop-types';
import {ActionCreator} from '../../reducer';
import {connect} from 'react-redux';

const FullScreenPlayer = (
    {isPlaying,
      progress,
      duration,
      onPlayButtonClick,
      onFullScreenButtonClick,
      onFullscreenToggle,
      children,
      film: {title}}) => {

  return (
    <div className="player">
      {children}
      <button onClick={onFullscreenToggle} type="button" className="player__exit">Exit</button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max={duration}/>
            <div className="player__toggler" style={{left: ((progress / duration) * 100) + `%`}}>Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>
        <div className="player__controls-row">
          <button onClick={onPlayButtonClick} type="button" className="player__play">
            {isPlaying ? (
              <>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"/>
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"/>
                </svg>
                <span>Play</span>
              </>
            )}
          </button>
          <div className="player__name">{title}</div>
          <button onClick={onFullScreenButtonClick} type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"/>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

FullScreenPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onFullScreenButtonClick: PropTypes.func.isRequired,
  onFullscreenToggle: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  film: state.film,
});

const mapDispatchToProps = (dispatch) => ({
  onFullscreenToggle() {
    dispatch(ActionCreator.setFullscreenPlayer(false));
  }
});

export {FullScreenPlayer};
export default connect(mapStateToProps, mapDispatchToProps)(FullScreenPlayer);
