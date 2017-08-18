import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectMovie } from '../ducks';

const getCode = props => props.navigation.state.params.code;

const mapStateToProps = (state, props) => ({
  movie: selectMovie(state, getCode(props)),
});

@connect(mapStateToProps)
export default class DetailContainer extends Component {
  static propTypes = {
    movie: PropTypes.object.isRequired,
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  });

  render() {
    return null;
  }
}
