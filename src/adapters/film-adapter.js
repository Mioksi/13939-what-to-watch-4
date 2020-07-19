const filmAdapter = (film) => {
  return {
    id: film.id,
    title: film.name,
    filmPoster: film.poster_image,
    image: film.preview_image,
    backgroundPoster: film.background_image,
    backgroundColor: film.background_color,
    src: film.video_link,
    preview: film.preview_video_link,
    description: film.description,
    rating: film.rating,
    ratingCount: film.scores_count,
    director: film.director,
    starring: film.starring,
    runTime: film.run_time,
    genre: film.genre,
    year: film.released,
    isFavoriteFilm: film.is_favorite
  };
};

export default filmAdapter;
