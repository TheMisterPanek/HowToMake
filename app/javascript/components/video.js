
import React from 'react';
import PropTypes from 'prop-types';
import Rnd from 'react-rnd';
import { connect } from 'react-redux';
import {moveBlock, resizeBlock} from '../actions/actions.js';

import RemoveHandler from './Buttons/RemoveHandler.js';
import {TiArrowMoveOutline} from 'react-icons/lib/ti'
  

class VideoBlock extends React.Component {
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
    return (
      <Rnd 
        lockAspectRatio = {true}
        className="image-block-container"
        bounds = "parent" 
        minHeight = '50'
        minWidth = '50'
        default = {{
          x:this.props.data.x,
          y:this.props.data.y,
          width: this.props.data.width
        }}
        onDragStop = {this.onMove}
        onResizeStop = {this.onResize}
        dragHandlerClassName={".drag-handler"}
      >
        <div >
          <div className="drag-handler">
            <TiArrowMoveOutline />
          </div>  
          <RemoveHandler block_id = {id}/> 
          <iframe src={this.props.data.url}></iframe>
        </div>
      </Rnd>
    );
  }
}
VideoBlock.propTypes = {
   data: PropTypes.object.isRequired,
   onBlockMove: PropTypes.func.isRequired,
   onBlockResize: PropTypes.func.isRequired,
 };

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

export default connect(undefined, mapDispatchToProps)(VideoBlock);