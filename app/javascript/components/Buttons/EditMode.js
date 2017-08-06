import React, { Component } from 'react';
import {connect} from 'react-redux';
import DefaultButton from './DefaultButton.js';
import {toggleEditMode} from '../../actions/actions.js';
import {GoBook,GoPaintcan} from 'react-icons/lib/go';

class EditMode extends Component {
  render() {
    if(this.props.myPost)
      {
        return (
          <DefaultButton 
            onMouseOver = {(e)=>e.target.style.zIndex = '9999'}
            onMouseLeave = {(e)=>e.target.style.zIndex = '0'} 
            className = "edit-mode-button" 
            text = {this.props.allowEdit ? 
              <span><GoBook/> go to read mode</span> 
              :<span><GoPaintcan/> go to  edit mode</span>} 
            onClick = {this.props.onToggleEditMode}/>
        );
      }
    return null;
  }
}

EditMode.PropTypes = {
  onToggleEditMode: React.PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>{
  return{
    allowEdit: state.getIn(["manual","edit_mode"]),
    myPost: state.getIn(["manual","myPost"]),
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