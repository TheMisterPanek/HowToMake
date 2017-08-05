import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPage } from '../../actions/actions.js';
import React, { Component } from 'react';
import DefaultButton from './DefaultButton.js';
import {MdTextFields} from 'react-icons/lib/md'

class AddText extends Component {
  render() {
    return (
        <DefaultButton text = {<span><MdTextFields/> Add Text </span>}  onClick = {this.props.onClick} />
    );
  }
}


export default AddText;
