import React, { Component } from 'react';
import {connect} from 'react-redux';

class Comments extends Component {
  render() {
    return (
      <div className = "comment-list">
  
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{

  }
}

const mapStateToProps = (state) =>{
  return{

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
