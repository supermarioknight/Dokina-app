import React from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Thumbnail = ({ uri, style }) => <Image source={{ uri }} style={[styles.thumbnail, style]} />;

Thumbnail.propTypes = {
  uri: PropTypes.string.isRequired,
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  thumbnail: {
    height: 140,
    width: 100,
  },
});

export default Thumbnail;
