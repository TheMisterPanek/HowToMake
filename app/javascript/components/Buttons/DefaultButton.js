import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPage } from '../../actions/actions.js';
import React, { Component } from 'react';

class DefaultButton extends Component {
  render() {
    return (
       <button type="button" 
        className={"btn btn-secondary "+this.props.className} 
        onMouseOver = {this.props.onMouseOver} 
        onMouseLeave = {this.props.onMouseLeave} 

        onClick={this.props.onClick}>
        {this.props.text}
      </button>
    );
  }
}


export default DefaultButton;
