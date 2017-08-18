import apiClient from '../../../common/services/apiClient';

export const apiCallIds = {
  FETCH_MOVIES: 'FETCH_MOVIES',
};

export default {
  fetchMovies: userId => {
    return apiClient.get('/movies.json', {
      apiCallId: apiCallIds.FETCH_MOVIES,
    });
  },
};
