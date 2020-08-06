import * as React from 'react';
import {Link} from 'react-router-dom';

import VideoPlayer from '../video-player/video-player';

import {AppRoute, VIDEO_DELAY} from '../../common/consts';
import {IMovieCardProps} from './types';

class MovieCard extends React.PureComponent<IMovieCardProps> {
  private timeout: ReturnType<typeof setTimeout>;

  constructor(props: IMovieCardProps) {
    super(props);

    this.timeout = null;

    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentWillUnmount(): void {
    clearTimeout(this.timeout);
  }

  private stopPlaying(): void {
    const {onStopPlaying} = this.props;

    clearTimeout(this.timeout);

    this.timeout = null;

    onStopPlaying();
  }

  private handleMouseEnter(id: number) {
    return () => {
      const {onCardMouseEnter, onStartPlaying} = this.props;

      this.timeout = setTimeout(onStartPlaying, VIDEO_DELAY);

      onCardMouseEnter(id);
    };
  }

  private handleMouseLeave(): void {
    const {onCardMouseLeave} = this.props;

    if (this.timeout) {
      this.stopPlaying();
    }

    onCardMouseLeave();
  }

  public render(): React.ReactElement {
    const {movie, isPlaying} = this.props;
    const {id, name, [`preview_image`]: image, [`preview_video_link`]: preview} = movie;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this.handleMouseEnter(id)}
        onMouseLeave={this.handleMouseLeave}
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

export default MovieCard;
