import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { View } from '../';

const ListItem = ({ left, center, right }) => (
  <View style={styles.item}>
    {left && <View style={styles.left}>{left}</View>}
    {center && <View style={styles.center}>{center}</View>}
    {right && <View style={styles.right}>{right}</View>}
  </View>
);

ListItem.propTypes = {
  left: PropTypes.node,
  center: PropTypes.node,
  right: PropTypes.node,
};

export default ListItem;

const styles = StyleSheet.create({
  item: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {},
  center: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  right: {},
});
