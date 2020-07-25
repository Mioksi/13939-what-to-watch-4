import {combineReducers} from 'redux';

import {reducer as data} from './films/films';
import {reducer as state} from './state/state';
import NameSpace from './name-space';

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.STATE]: state,
});
