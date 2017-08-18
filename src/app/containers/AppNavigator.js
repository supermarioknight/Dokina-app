import { StackNavigator } from 'react-navigation';
import { MoviesListContainer, DetailContainer } from '../../features/movies/containers';

export default StackNavigator(
  {
    MoviesList: { screen: MoviesListContainer },
    MovieDetail: { screen: DetailContainer },
  },
  {
    initialRouteName: 'MoviesList',
  }
);
