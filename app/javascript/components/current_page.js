import React from 'react';
import PropTypes from 'prop-types';
import Block from './block.js'
import ReactDOM from 'react-dom';
import ImageBlock from './image.js';
import TextBlock from './text.js';
import VideoBlock from './video.js'
import DefaultButton from './Buttons/DefaultButton.js';
import {connect} from 'react-redux';
import EditMode from './Buttons/EditMode.js';

const CurrentPage = ({ title, position, blocks }) => {
  let pageBlocks = null||blocks.map(block =>{
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
        <EditMode/>
        <div className = "header" >{position} {title}</div>
        {pageBlocks}
    </div>);
}

CurrentPage.propTypes = {
  title: PropTypes.string.isRequired,
  position: PropTypes.number,
  blocks: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.object.isRequired,   
  }).isRequired).isRequired,
  
};

export default CurrentPage;