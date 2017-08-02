import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPage,createTextBlock, createImageBlock, createVideoBlock, toggleEditMode } from '../actions/actions.js';
import '../cloudinary.js';
import urlParser from 'js-video-url-parser';
import AddPage from './Buttons/AddPage.js';
import AddImage from './Buttons/AddImage.js';
import AddText from './Buttons/AddText.js';
import AddVideo from './Buttons/AddVideo.js';


const PageButtons = ({ manual_id,onAddPage,onAddImage, onAddVideo,onAddText, onToggleEditMode }) => {
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
      <AddPage  onClick = {onAddPage} /> 
      <AddImage onClick = {onAddImage}/>
      <AddText  onClick = {onAddText} />
      <AddVideo onClick = {onAddVideo}/>
    </div>
  );
};

PageButtons.propTypes = {
  onAddVideo: PropTypes.func.isRequired,
  onAddText: PropTypes.func.isRequired,
  onAddImage: PropTypes.func.isRequired,
  onAddPage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    manual_id: state.getIn(["manual", "manual_id"]),
  };

};

const mapDispatchToProps = (dispatch) =>{
  return{
    
    onAddPage: ({manual_id}) => {
        const title = prompt("Please enter title", "");
        if (title != null) {
            dispatch(createPage(manual_id, title));
      }
    },
    onAddImage: ()=>{
      cloudinary.openUploadWidget({ cloud_name: 'dz2gzsnxo', upload_preset: 'zs2nzpf4'}, 
        (error, result) => { 
        if (result) {
          dispatch(createImageBlock(result[0]));
        }
        });
      },
    onAddText: ()=>{
        let text = prompt('Enter your text');
        if(text)
        {
          dispatch(createTextBlock(text));
        }

      },
    onAddVideo:()=>{
        let url = prompt('Enter link into video');
        let video = urlParser.parse(url);
        if(video)
        {
          
        if(video.provider == 'youtube')
        {
          var defaultUrl = "https://www.youtube.com/embed/";
          let fullUrl = defaultUrl+video.id; 
          dispatch(createVideoBlock(fullUrl));
        }
        else{
          alert('Error format. Provider '+video.provider+' not supported')
        }}
        else{
          alert('unknow format!');
        }
      }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(PageButtons);

