import React from 'react';
import { connect } from 'react-redux';
import Buttons from './buttons.js'

const Toolbar = ({ dispatch, allowEdit }) => {
  if(allowEdit){
  return (
    <Buttons />
  )}
  else{
    return null;
  }
};

const mapStateToProps = (state)=>{
  return{
    allowEdit: state.getIn(["manual","edit_mode"])
  }
}

export default connect(mapStateToProps)(Toolbar);