import React from 'react';
import PropTypes from 'prop-types';
import Rnd from 'react-rnd';
import { connect } from 'react-redux';
import {moveBlock, resizeBlock, saveText, removeBlock} from '../actions/actions.js';
import autosize from "autosize";
import RemoveHandler from './Buttons/RemoveHandler.js';
import {TiArrowMoveOutline} from 'react-icons/lib/ti'



const ShowTextArea = ({data,onMove,onResize,disabled,onRemoveBlock,onChange,id})=>{

  const onChangeTextInTextAreaWithDelay = (e)=>{
    e.target.style.border = '3px solid red'; 
    clearTimeout(lastHandle);
    let target = e.target;
    lastHandle = setTimeout(()=>onChangeTextInTextAreaBase(id,target), delayFromSend)
  }


  const onBlur = (e)=>{
    clearTimeout(lastHandle);
    let target = e.target;
    onChangeTextInTextAreaBase(id,target);
  }


  const onChangeTextInTextAreaBase = (id,target)=>{
        target.style.border = '3px solid #73AD21';
        onChange(id,target.value);
  }
    const delayFromSend = 2500;
    let lastHandle;
    if(disabled)
      {
        return( 
          <Rnd  
            disableDragging = {true}
            enableResizing = {{ top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
            default= {data}>
            <div className="text-area text-area-label">{data.text}</div>
          </Rnd>);
      }
    return(
      <Rnd dragHandlerClassName={".drag-handler"} bounds = "parent" default = {{...data}}
        onDragStop = {onMove}
        onResizeStop = {onResize}
        enableResizing = {{ top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
      >
        <div className="drag-handler">
          <TiArrowMoveOutline />
        </div>  
        <RemoveHandler block_id = {id}/>
        <textarea 
          onChange = {onChangeTextInTextAreaWithDelay}
          onBlur = {onBlur}
          disabled = {disabled} 
          defaultValue = {data.text} 
          className="text-area"  
          onKeyDown={() => {autosize($('.text-area'))}} 
          className="block" ></textarea>
      </Rnd>
    );
  }

ShowTextArea.PropTypes = {
  data: PropTypes.object.isRequired,
  onMove: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

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
      <ShowTextArea 
        disabled = {!this.props.allowEdit} 
        onChange = {this.props.onChangeTextInBlock} 
        onMove = {this.onMove} 
        onResize = {this.onResize} 
        onRemoveBlock = {this.props.onRemoveBlock}
        data = {this.props.data}
        id = {this.props.id}
        />
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
    onRemoveBlock: (id) =>{
      dispatch(removeBlock(id))
    },
    onChangeTextInBlock: (id,text)=>{
      dispatch(saveText(id,text));
    },
    onBlockResize: (id, direction, w, h) => {
      dispatch(resizeBlock(id, direction, w, h));
    },
    onBlockMove: (id, x, y) => {
      dispatch(moveBlock(id, x, y));
    }
  };
};

const mapStateToProps = (state)=>{
  return{
    allowEdit: state.getIn(["manual","edit_mode"]),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TextBlock);