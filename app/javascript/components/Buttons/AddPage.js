import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPage } from '../../actions/actions.js';
import React, { Component } from 'react';
import DefaultButton from './DefaultButton.js';

class AddPage extends Component {
  render() {
    return (
        <DefaultButton text = "Add Page" onClick = {this.props.onClick} />
    );
  }
}


export default AddPage;
