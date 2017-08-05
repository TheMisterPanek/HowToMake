import React from 'react';
import PropTypes from 'prop-types';
import Block from './block.js'
import ReactDOM from 'react-dom';
import ImageBlock from './image.js';
import TextBlock from './text.js';
import VideoBlock from './video.js'
import DefaultButton from './Buttons/DefaultButton.js';
import {connect} from 'react-redux';
import {changeTitle} from '../actions/actions.js';
import InlineEdit from 'react-edit-inline';



const CurrentPage = ({ title, position, blocks,onChangeTitle,allowEdit,currentPage }) => {
  let pageBlocks = blocks.map(block =>{
        switch(block.type){
          case 'Image':
            return <ImageBlock id = {block.id} key = {block.id} data = {block.data}/>
          case 'Text':
            return <TextBlock  id = {block.id} key = {block.id} data = {block.data}/>
          case 'Video':
            return <VideoBlock id = {block.id} key = {block.id} data = {block.data}/>
          default:
            return null;
        }
      });
  return (
      <div className = "currentPage">
        <div className = "header" >
          {position} {allowEdit?
              <InlineEdit text = {title} paramName = "newTitle" change = {(e)=>onChangeTitle(currentPage,e)}/>
              :<span>{title}</span>}
        </div>
        {pageBlocks}
    </div>);
}

CurrentPage.propTypes = {
  title: PropTypes.string.isRequired,
  position: PropTypes.number,
  blocks: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.object.isRequired,   
  }).isRequired).isRequired,
  currentPage: PropTypes.number.isRequired,
  
};
const mapStateToProps = (state) =>{
  return{
    allowEdit: state.getIn(["manual","edit_mode"]),
    currentPage: state.getIn(["manual","currentPage"]),
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    onChangeTitle:(id,e)=>{
      dispatch(changeTitle(id,e.newTitle));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CurrentPage);