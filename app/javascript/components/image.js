import React from 'react';
import PropTypes from 'prop-types';
import Rnd from 'react-rnd';
import { connect } from 'react-redux';
import {moveBlock, resizeBlock} from '../actions/actions.js';
import RemoveHandler from './Buttons/RemoveHandler.js';

class ImageBlock extends React.Component {
  constructor(props) {
    super(props);
    this.onResize = this.onResize.bind(this);
    this.onMove = this.onMove.bind(this);
  }

  onMove(event: SyntheticMouseEvent, data: DraggableData) {
    this.props.onBlockMove(this.props.id, data.x, data.y);
  }

  onResize(event: MouseEvent, data: Direction, refToElement: HTMLElement, delta: NumberSize,) {
    this.props.onBlockResize(this.props.id, data, delta.width, delta.height);
  }

  render() {
    const showHandlers = (allowEdit,block)=>{
      if(allowEdit){
        return block;
      }
      else
      {
        return null;
      }
    }
    return (
      <Rnd 
        lockAspectRatio = {true}
        className= {this.props.allowEdit?"image-block-container":""}
        bounds = "parent"
        disableDragging = {!this.props.allowEdit} 
        enableResizing = {{
          bottom: this.props.allowEdit,
          bottomLeft: this.props.allowEdit,
          bottomRight: this.props.allowEdit,
          left: this.props.allowEdit,
          right: this.props.allowEdit,
          top: this.props.allowEdit,
          topLeft: this.props.allowEdit,
          topRight: this.props.allowEdit,
        }}
        minHeight = '50'
        minWidth = '50'
        default = {{
          x:this.props.data.x,
          y:this.props.data.y,
          width: this.props.data.width
        }}
        onDragStop = {this.onMove}
        onResizeStop = {this.onResize}
      >
        <div >
          {showHandlers(this.props.allowEdit,<RemoveHandler block_id = {this.props.id}/>)}
          <img className = "image-block"  src = {this.props.data.url}></img>
        </div>
      </Rnd>
    );
  }
}

ImageBlock.propTypes = {
   data: PropTypes.object.isRequired,
   onBlockMove: PropTypes.func.isRequired,
   onBlockResize: PropTypes.func.isRequired,
 };

const mapStateToProps = (state) =>{
  return{
    allowEdit: state.getIn(["manual","edit_mode"]),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBlockResize: (id, direction, w, h) => {
      dispatch(resizeBlock(id, direction, w, h));
    },
    onBlockMove: (id, x, y) => {
      dispatch(moveBlock(id, x, y));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageBlock);