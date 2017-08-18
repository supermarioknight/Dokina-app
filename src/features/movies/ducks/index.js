import { combineReducers } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createApiActionCreators,
  createActionCreator,
  createReducer,
  createActionType,
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../../../common/utils/reduxHelpers';
import api from '../api';

/**
 * ACTION TYPES
 */
export const FETCH_MOVIES = 'auth/FETCH_MOVIES';
export const ORDER_BY = 'auth/ORDER_BY';

/**
 * ACTIONS
 */
export const fetchMoviesActions = createApiActionCreators(FETCH_MOVIES);
export const orderByAction = createActionCreator(ORDER_BY);

/**
 * REDUCERS
 */
const initialState = {
  list: [],
};

function compare(property, a, b) {
  if (a[property] < b[property]) return 1;
  if (a[property] > b[property]) return -1;
  return 0;
}

const list = createReducer(initialState.list, {
  [FETCH_MOVIES]: {
    [SUCCESS]: (state, payload) =>
      payload
        .map(movie => ({
          ...movie,
          imdbRating: movie.imdbRating * 10,
          imgurPosterUrl: movie.imgurPosterUrl.replace('http', 'https'),
          csfdUrl: movie.csfdUrl.replace('http', 'https'),
          imdbUrl: movie.imdbUrl
            .replace('http', 'https')
            .replace('www.imdb.com', 'm.imdb.com')
            .replace('combined', ''),
          cinemacityUrl: `https://www.cinemacity.sk/showFeatInfo?featureCode=${movie.code}`,
        }))
        .sort(compare.bind(null, 'imdbRating')),
    [FAILURE]: (state, payload) => initialState.list,
  },
  [ORDER_BY]: (state, payload) => [
    ...state.sort(compare.bind(null, payload ? 'csfdRating' : 'imdbRating')),
  ],
});

export default combineReducers({
  list,
});

/**
 * SELECTORS
 */
export const selectMovies = state => state.movies;

export const selectList = state => selectMovies(state).list;
export const selectMovie = (state, code) => selectList(state).find(movie => movie.code === code);

/**
 * SAGAS
 */
function* fetchMovies() {
  const resp = yield call(api.fetchMovies);

  if (resp.ok) {
    yield put(fetchMoviesActions.success(resp.data));
  } else {
    yield put(fetchMoviesActions.failure(resp.error));
  }
}

export function* moviesSaga() {
  yield takeLatest(createActionType(FETCH_MOVIES, REQUEST), fetchMovies);
}
