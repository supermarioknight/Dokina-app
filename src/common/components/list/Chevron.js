import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Button } from '../';

const Chevron = ({ onPress }) =>
  <View style={styles.right}>
    <Button
      type="icon"
      onPress={onPress}
      title={<Icon name="chevron-right" style={styles.chevron} />}
    />
  </View>;

Chevron.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default Chevron;

const styles = StyleSheet.create({
  chevron: {
    color: 'rgba(0, 0, 0, 0.25)',
    fontSize: 20,
  },
});
