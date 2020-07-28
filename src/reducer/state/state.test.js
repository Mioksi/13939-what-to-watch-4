import {reducer, ActionCreator, ActionType} from './state';
import {ALL_GENRES, MAX_MOVIES} from '../../common/consts';

const currentGenre = `Drama`;

describe(`Reducer work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      genre: ALL_GENRES,
      shownMoviesCount: MAX_MOVIES,
      isPlayerActive: false,
      activeFilm: -1,
      isFormDisabled: false
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
});

describe(`Action creators work correctly`, () => {
  it(`Action creator return action with change genre`, () => {
    expect(ActionCreator.changeGenre(currentGenre)).toEqual({
      type: ActionType.CHANGE_GENRE,
      payload: currentGenre,
    });
  });
});
