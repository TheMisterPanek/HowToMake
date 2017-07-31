import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPage,createTextBlock, createImageBlock, createVideoBlock } from '../actions/actions.js';
import '../cloudinary.js';

const PageButtons = ({ manual_id, dispatch }) => {
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <button type="button" className="btn btn-secondary" onClick={() => {
        const title = prompt("Please enter title", "");
        if (title != null) {
            dispatch(createPage(manual_id, title));
        }
        
      }}>
        Add Page
      </button>
      <button type="button" onClick={()=>{
           cloudinary.openUploadWidget({ cloud_name: 'dz2gzsnxo', upload_preset: 'zs2nzpf4'}, 
            (error, result) => { 
              if (result) {
                dispatch(createImageBlock(result[0]));
              }
            });
        }} 
        className="btn btn-secondary">
        Add image
      </button>
      <button type="button" className="btn btn-secondary" onClick = {()=>{
        let text = prompt('Enter your text');
        if(text)
        {
          dispatch(createTextBlock(text));
        }

      }}>
        Add Text
      </button>
      <button type="button" className="btn btn-secondary" onClick={()=>{
        let url = prompt('Enter link into video');
        if(url)
        {
          dispatch(createVideoBlock(url));
        }
      }}>
        Add Video
      </button>
    </div>
  );
};

PageButtons.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    manual_id: state.getIn(["manual", "manual_id"]),
  };

};

export default connect(
  mapStateToProps,
  undefined)(PageButtons);

