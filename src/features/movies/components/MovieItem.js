import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Platform } from 'react-native';
import { Text, View, Button, TouchableItem, Thumbnail, ListItem } from '../../../common/components';

const MovieItem = ({ item, onMovieClick, openExternalUrl }) => {
  const onClick = () => onMovieClick(item);

  return (
    <ListItem
      left={
        <TouchableItem onPress={onClick}>
          <Thumbnail uri={item.imgurPosterUrl} />
        </TouchableItem>
      }
      center={
        <View style={styles.centerContainer}>
          <TouchableItem onPress={onClick}>
            <Text style={styles.title}>{item.skTitle}</Text>
          </TouchableItem>
          {item.skTitle !== item.originalTitle && (
            <TouchableItem onPress={onClick}>
              <Text>({item.originalTitle})</Text>
            </TouchableItem>
          )}
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>
              IMDB:{' '}
              <Text style={[styles.ratingNumber, getRatingColor(item.imdbRating)]}>
                {item.imdbRating}%
              </Text>
            </Text>
            <Text style={styles.rating}>
              ČSFD:{' '}
              <Text style={[styles.ratingNumber, getRatingColor(item.csfdRating)]}>
                {item.csfdRating}%
              </Text>
            </Text>
          </View>
          <View style={styles.buttons}>
            <Button onPress={() => openExternalUrl(item.imdbUrl)} title="IMDB" />
            <Button onPress={() => openExternalUrl(item.csfdUrl)} title="ČSFD" />
            <Button onPress={() => openExternalUrl(item.cinemacityUrl)} title="Kino" />
          </View>
        </View>
      }
    />
  );
};

MovieItem.propTypes = {
  item: PropTypes.object.isRequired,
  onMovieClick: PropTypes.func.isRequired,
  openExternalUrl: PropTypes.func.isRequired,
};

export default MovieItem;

function getRatingColor(rating) {
  if (rating > 70) {
    return styles.positiveColor;
  } else if (rating > 50) {
    return styles.neutralColor;
  }
  return styles.negativeColor;
}

const styles = StyleSheet.create({
  centerContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  rating: {
    paddingRight: 10,
    fontSize: 16,
  },
  ratingNumber: {
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -5,
  },
  positiveColor: {
    color: Platform.select({ ios: 'rgb(76,217,100)', android: '#4CAF50' }),
  },
  neutralColor: {
    color: Platform.select({ ios: 'rgb(255,149,0)', android: '#FF9800' }),
  },
  negativeColor: {
    color: Platform.select({ ios: 'rgb(255,59,48)', android: '#F44336' }),
  },
});
