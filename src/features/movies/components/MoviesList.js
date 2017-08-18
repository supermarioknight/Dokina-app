import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { List, SegmentedControl, ScrollView, Text } from '../../../common/components';
import MovieItem from './MovieItem';

export default class MoviesList extends Component {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    keyExtractor: PropTypes.func.isRequired,
    selectedIndex: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    goToDetail: PropTypes.func.isRequired,
    openExternalUrl: PropTypes.func.isRequired,
  };

  renderItem = ({ item }) => {
    const { goToDetail, openExternalUrl } = this.props;

    return <MovieItem item={item} openExternalUrl={openExternalUrl} onMovieClick={goToDetail} />;
  };

  render() {
    const { movies, keyExtractor, selectedIndex, onChange } = this.props;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.switchLabel}>Zoradiť podľa:</Text>
        <SegmentedControl
          values={['IMDB', 'ČSFD']}
          style={styles.switch}
          onChange={onChange}
          selectedIndex={selectedIndex}
        />
        <List data={movies} keyExtractor={keyExtractor} renderItem={this.renderItem} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  switchLabel: {
    marginVertical: 5,
    textAlign: 'center',
  },
  switch: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
