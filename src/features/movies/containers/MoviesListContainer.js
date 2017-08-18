import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Linking } from 'react-native';
import AlertService from '../../../common/services/alert';
import { selectIsInProgress } from '../../../features/spinner/ducks';
import { Spinner } from '../../../features/spinner/components';
import { apiCallIds } from '../api';
import { fetchMoviesActions, selectList, orderByAction } from '../ducks';
import MoviesList from '../components/MoviesList';

const mapStateToProps = state => ({
  isLoading: selectIsInProgress(state, apiCallIds.FETCH_MOVIES),
  movies: selectList(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      fetchMovies: fetchMoviesActions.request,
      orderBy: orderByAction,
    },
    dispatch
  ),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class MoviesListContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    movies: PropTypes.array.isRequired,
  };

  static navigationOptions = {
    title: 'Cinema City Bratislava',
  };

  state = {
    selectedIndex: 0,
  };

  componentDidMount() {
    this.props.actions.fetchMovies();
  }

  openExternalUrl = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        AlertService.error(`Don't know how to open URI: ${url}`);
      }
    });
  };

  goToDetail = movie =>
    this.props.navigation.navigate('MovieDetail', { code: movie.code, title: movie.skTitle });

  onChange = e => {
    const { orderBy } = this.props.actions;
    const selectedIndex = e.nativeEvent.selectedSegmentIndex;

    this.setState({ selectedIndex }, () => orderBy(selectedIndex));
  };

  keyExtractor = movie => movie.code;

  render() {
    const { isLoading, movies } = this.props;
    const { selectedIndex } = this.state;

    return (
      <Spinner show={isLoading}>
        <MoviesList
          movies={movies}
          keyExtractor={this.keyExtractor}
          selectedIndex={selectedIndex}
          onChange={this.onChange}
          goToDetail={this.goToDetail}
          openExternalUrl={this.openExternalUrl}
        />
      </Spinner>
    );
  }
}
