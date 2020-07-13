import {reducer, ActionCreator, ActionType} from './reducer';
import {ALL_GENRES, MAX_MOVIES} from './common/consts';

const film = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  runTime: `1h 39m`,
  year: 2014,
  backgroundPoster: `img/bg-the-grand-budapest-hotel.jpg`,
  filmPoster: `img/the-grand-budapest-hotel-poster.jpg`,
  src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  rating: 8.9,
  ratingCount: 240,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege. Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  director: `Wes Andreson`,
  starring: `Bill Murray, Edward Norton, Jude Law, Willem Dafoe`
};

const movies = [
  {
    id: 1,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    genre: `Family`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 2,
    title: `Bohemian Rhapsody`,
    genre: `Documentary`,
    image: `img/bohemian-rhapsody.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
  {
    id: 3,
    title: `Macbeth`,
    genre: `Drama`,
    image: `img/macbeth.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 4,
    title: `Aviator`,
    genre: `Drama`,
    image: `img/aviator.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
  {
    id: 5,
    title: `We need to talk about Kevin`,
    genre: `Drama`,
    image: `img/we-need-to-talk-about-kevin.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 6,
    title: `What We Do in the Shadows`,
    genre: `Horror`,
    image: `img/what-we-do-in-the-shadows.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
  {
    id: 7,
    title: `Revenant`,
    genre: `Drama`,
    image: `img/revenant.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 8,
    title: `Johnny English`,
    genre: `Comedian`,
    image: `img/johnny-english.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  }
];

const reviews = [
  {
    id: 1,
    author: `Kate Muir`,
    date: `December 24, 2016`,
    rating: 8.9,
    text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years`,
  },
  {
    id: 2,
    author: `Bill Goodykoontz`,
    date: `November 18, 2015`,
    rating: 8.0,
    text: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
  },
  {
    id: 3,
    author: `Amanda Greever`,
    date: `November 18, 2015`,
    rating: 8.0,
    text: `I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.`,
  },
  {
    id: 4,
    author: `Matthew Lickona`,
    date: `December 20, 2016`,
    rating: 7.2,
    text: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
  },
  {
    id: 5,
    author: `Paula Fleri-Soler`,
    date: `December 20, 2016`,
    rating: 7.6,
    text: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult`,
  },
  {
    id: 6,
    author: `Paula Fleri-Soler`,
    date: `December 20, 2016`,
    rating: 7.0,
    text: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult`,
  },
];

const currentGenre = `Drama`;

const getGenresList = (allMovies) => [ALL_GENRES, ...new Set(allMovies.map((movie) => movie.genre))];

const getFilteredMovies = (genre) => movies.filter((movie) => movie.genre === genre);

describe(`Reducer work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      genre: ALL_GENRES,
      movies,
      film,
      reviews,
      genresList: getGenresList(movies),
      shownMoviesCount: MAX_MOVIES,
      isPlayerActive: false,
    });
  });

  it(`Reducer should change current genre by a given value`, () => {
    expect(reducer({
      genre: ALL_GENRES,
    }, {
      type: ActionType.CHANGE_GENRE,
      payload: currentGenre
    })).toEqual({
      genre: currentGenre,
    });
  });

  it(`Reducer should change current movies by a given value`, () => {
    expect(reducer({
      movies,
    }, {
      type: ActionType.GET_MOVIES_BY_GENRE,
      payload: getFilteredMovies(currentGenre),
    })).toEqual({
      movies: getFilteredMovies(currentGenre),
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator return action with change genre`, () => {
    expect(ActionCreator.changeGenre(currentGenre)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: currentGenre,
    });
  });

  it(`Action creator return movies with change genre`, () => {
    expect(ActionCreator.getMoviesByGenre(currentGenre)).toEqual({
      type: ActionType.GET_MOVIES_BY_GENRE,
      payload: getFilteredMovies(currentGenre),
    });
  });
});
