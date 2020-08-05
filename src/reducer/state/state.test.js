import {reducer, ActionCreator, ActionType} from './state';
import {ALL_GENRES, MAX_MOVIES} from '../../common/consts';

const currentGenre = `Drama`;

const film = {
  id: 1,
  name: `The Grand Budapest Hotel`,
  genre: `Drama`,
  [`run_time`]: 99,
  released: 2014,
  [`preview_image`]: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  [`background_image`]: `img/bg-the-grand-budapest-hotel.jpg`,
  [`poster_image`]: `img/the-grand-budapest-hotel-poster.jpg`,
  [`video_link`]: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  [`preview_video_link`]: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  rating: 8.9,
  [`scores_count`]: 240,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege. Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  [`is_favorite`]: false
};

describe(`Reducer work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      genre: ALL_GENRES,
      shownMoviesCount: MAX_MOVIES,
      activeFilm: {}
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

  it(`Reducer should change shown movies count`, () => {
    expect(reducer({
      shownMoviesCount: 8
    }, {
      type: ActionType.SHOW_MORE_MOVIES,
      payload: 8
    })).toEqual({
      shownMoviesCount: 16
    });
  });

  it(`Reducer should reset shown movies count`, () => {
    expect(reducer({
      shownMoviesCount: 10
    }, {
      type: ActionType.RESET_SHOWN_MOVIES,
      payload: null
    })).toEqual({
      shownMoviesCount: 8
    });
  });

  it(`Reducer should get active film`, () => {
    expect(reducer({
      activeFilm: {}
    }, {
      type: ActionType.GET_ACTIVE_FILM,
      payload: film
    })).toEqual({
      activeFilm: film
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

  it(`Action creator return action with shown movies`, () => {
    expect(ActionCreator.showMoreMovies()).toEqual({
      type: ActionType.SHOW_MORE_MOVIES,
      payload: 8,
    });
  });

  it(`Action creator return action with reset shown movies`, () => {
    expect(ActionCreator.resetShownMovies()).toEqual({
      type: ActionType.RESET_SHOWN_MOVIES,
      payload: null,
    });
  });

  it(`Action creator return action with active film`, () => {
    expect(ActionCreator.getActiveFilm(film)).toEqual({
      type: ActionType.GET_ACTIVE_FILM,
      payload: film,
    });
  });
});
