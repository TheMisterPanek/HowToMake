import React, { Component } from 'react';
import {connect} from 'react-redux';
import DefaultButton from './DefaultButton.js';
import {toggleEditMode} from '../../actions/actions.js';

class EditMode extends Component {
  render() {
    return (
      <DefaultButton 
        onMouseOver = {(e)=>e.target.style.zIndex = '9999'}
        onMouseLeave = {(e)=>e.target.style.zIndex = '0'} 
        className = "edit-mode-button" 
        text = {this.props.allowEdit ? "go to read mode": "go to editing mode"} 
        onClick = {this.props.onToggleEditMode}/>
    );
  }
}

EditMode.PropTypes = {
  onToggleEditMode: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>{
  return{
    allowEdit: state.getIn(["manual","edit_mode"]),
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    onToggleEditMode:()=>{
      dispatch(toggleEditMode());
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditMode);