import React, { Component } from 'react';
import {connect} from 'react-redux';

 class CreateComment extends Component {
  render() {
    return (
      <button onClick = {this.props.onClick}>Отправить отзыв</button>
    );
  }
}


const mapDispatchToProps = (dispatch)=>{
  return{
    onClick: ()=>{
      dispatch({type:'SEND_MESSAGE',text: 'my text'});
    }
  }
}


export default connect(undefined,mapDispatchToProps)(CreateComment);