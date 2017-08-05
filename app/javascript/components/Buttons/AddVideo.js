import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPage } from '../../actions/actions.js';
import React, { Component } from 'react';
import DefaultButton from './DefaultButton.js';
import {MdMovie} from "react-icons/lib/md";

class AddVideo extends Component {
  render() {
    return (
        <DefaultButton text = {<span><MdMovie/> Add Video </span>} onClick = {this.props.onClick} />
    );
  }
}


export default AddVideo;
