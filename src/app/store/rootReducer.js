import { combineReducers } from 'redux';
import movies from '../../features/movies/ducks';
import spinner from '../../features/spinner/ducks';

const rootReducer = combineReducers({
  movies,
  spinner,
});

export default (state, action) => rootReducer(state, action);
