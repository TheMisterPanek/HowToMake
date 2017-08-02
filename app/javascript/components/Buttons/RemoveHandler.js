import React, { Component } from 'react';
import {removeBlock} from '../../actions/actions.js';
import {connect} from 'react-redux';
export class RemoveHandler extends Component {
  render() {
    return (
      <div 
        className="remove-handler" 
        onClick = {()=>{
          if(confirm('seriosly?'))
            {this.props.onRemoveBlock(this.props.block_id)}
          }
        }>
      </div> 
    );
  }
}

RemoveHandler.PropTypes = {
  block_id: React.PropTypes.number.isRequired,
  onRemoveBlock: React.PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveBlock: (id) =>{
      dispatch(removeBlock(id))
    },
  }
}

export default connect(undefined,mapDispatchToProps)(RemoveHandler);
