import React from 'react';
import PropTypes from 'prop-types';
import Block from './block.js'

const CurrentPage = ({ title, position, blocks }) => (
   <div className="currentPage" >
    {blocks.map(block =>
    <Block
      key={block.id}
      {...block}
    />)}
    <div className="position-text">{position}:{title}</div>
  </div>
);

CurrentPage.propTypes = {
  title: PropTypes.string.isRequired,
  position: PropTypes.number,
  blocks: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.object.isRequired,   
  }).isRequired).isRequired,
};

export default CurrentPage;