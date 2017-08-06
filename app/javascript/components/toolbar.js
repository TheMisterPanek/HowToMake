import React from 'react';
import { connect } from 'react-redux';
import Buttons from './buttons.js'
import EditMode from './Buttons/EditMode.js';
import Comments from './Comments.js';

const Toolbar = ({ dispatch, allowEdit }) => {
  let buttons = allowEdit?<Buttons />:"";
  return (
  <div>
    <Comments />
    <EditMode/>
    {buttons}
  </div>
  )
};

const mapStateToProps = (state)=>{
  return{
    allowEdit: state.getIn(["manual","edit_mode"])
  }
}

export default connect(mapStateToProps)(Toolbar);  