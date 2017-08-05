import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPage } from '../../actions/actions.js';
import React, { Component } from 'react';
import DefaultButton from './DefaultButton.js';

class AddImage extends Component {
  render() {
    return (
        <DefaultButton text = "Add Image" onClick = {this.props.onClick} />
    );
  }
}


export default AddImage;