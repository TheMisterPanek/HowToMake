import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPage } from '../../actions/actions.js';
import React, { Component } from 'react';
import DefaultButton from './DefaultButton.js';
import {MdAddAPhoto} from "react-icons/lib/md";

class AddImage extends Component {
  render() {
    return (
        <DefaultButton text = {<span><MdAddAPhoto/> Add image </span>}  onClick = {this.props.onClick} />
    );
  }
}


export default AddImage;
