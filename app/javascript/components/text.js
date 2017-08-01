import React from 'react';
import PropTypes from 'prop-types';
import Rnd from 'react-rnd';
import { connect } from 'react-redux';
import {moveBlock, resizeBlock} from '../actions/actions.js';
import autosize from "autosize";

class TextBlock extends React.Component {
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
        <Rnd dragHandlerClassName={".drag-handler"} bounds = "parent" default = {{...this.props.data}}
          onDragStop = {this.onMove}
          onResizeStop = {this.onResize}
          >
          <div className="drag-handler"></div>      
          <textarea className="text-area"  onKeyDown={() => {autosize($('.text-area'))}} className="block" >{this.props.data.text}</textarea>
        </Rnd>
    );
  }
}

TextBlock.propTypes = {
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

export default connect(undefined, mapDispatchToProps)(TextBlock);