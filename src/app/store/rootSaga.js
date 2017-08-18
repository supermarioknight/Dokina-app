import { all } from 'redux-saga/effects';
import { moviesSaga } from '../../features/movies/ducks';

export default function* rootSaga() {
  yield all([moviesSaga()]);
}
