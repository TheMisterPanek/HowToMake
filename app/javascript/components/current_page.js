import React from 'react';
import PropTypes from 'prop-types';
import Block from './block.js'
import ReactDOM from 'react-dom';
import ImageBlock from './image.js';
import {TextBlock} from './text.js';
import {VideoBlock} from './video.js'

const CurrentPage = ({ title, position, blocks }) => {
  let pageBlocks = blocks.map(block =>{
        switch(block.type){
          case 'Image':
            return <ImageBlock id = {block.id} key = {block.id} data = {block.data}/>
          case 'Text':
            return <TextBlock key = {block.id} {...block.data}/>
          case 'Video':
            return <VideoBlock key = {block.id} {...block.data}/>
          default:
            return null;
        }
      });
  return (
      <div className = "currentPage">
        <div className = "header">{position} {title}</div>
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