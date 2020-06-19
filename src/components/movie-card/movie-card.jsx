import React from 'react';
import PropTypes from "prop-types";

const MovieCard = ({movie, onCardTitleClick, onCardMouseEnter, onCardMouseLeave}) => {
  const {id, title, image} = movie;

  const handleMouseEnter = () => onCardMouseEnter(id);

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onCardMouseLeave}
    >
      <div className="small-movie-card__image">
        <img src={image} alt={title} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <a onClick={onCardTitleClick} className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
  onCardMouseLeave: PropTypes.func.isRequired,
};

export default MovieCard;
