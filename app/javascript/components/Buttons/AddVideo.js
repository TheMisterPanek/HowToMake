import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPage } from '../../actions/actions.js';
import React, { Component } from 'react';
import DefaultButton from './DefaultButton.js';

class AddVideo extends Component {
  render() {
    return (
        <DefaultButton text = "Add video" onClick = {this.props.onClick} />
    );
  }
}


export default AddVideo;
