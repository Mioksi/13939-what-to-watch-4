import {combineReducers} from 'redux';

import {reducer as films} from './films/films';
import {reducer as state} from './state/state';
import {reducer as user} from './user/user';

import NameSpace from './name-space';

export default combineReducers({
  [NameSpace.FILMS]: films,
  [NameSpace.STATE]: state,
  [NameSpace.USER]: user,
});
