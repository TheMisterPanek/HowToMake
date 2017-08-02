import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removePage } from '../actions/actions.js';
import { selectCurrentPage } from '../actions/actions.js';

const DragHandle = SortableHandle(() =>{ 
  return(
  <span 
    className = "glyphicon glyphicon-resize-vertica"
  >
  </span>)});

const AllowEdit = (allowEdit,block)=>{
  if (allowEdit){
    return block;
  }
  else {
    return null;
  }
}

const Page = SortableElement(({ onKeyPress, onClick, title, position, id, edit_mode }) => 
  <div 
    className="page" 
    onClick={onClick} 
    onKeyPress={(e) => {
      if(edit_mode)
      {
        let key = e.keyCode || e.charCode;
        if( key == 127 ){
          onKeyPress();
        }
      }}
    } 
    tabIndex="0">
    {AllowEdit(edit_mode,<DragHandle/>)}
    {title}
  </div>
);

Page.propTypes = {
  onClick: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
};

const SortablePages = SortableContainer(({pages, onPageClick, onKeyDeleteDown,edit_mode}) => {
  return (
    <div className="preview">
      {pages.map((page, index) => (
        <Page
          edit_mode = {edit_mode}
          key={page.id}
          index={index}
          {...page}
          onClick={() => onPageClick(page.id)}
          onKeyPress={() => onKeyDeleteDown(page.id)}
        />
      ))}
    </div>
  );
});

const mapStateToProps = (state) =>{
  return{
    edit_mode: state.getIn(['manual','edit_mode']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPageClick: (id) => {
      dispatch(selectCurrentPage(id));
    },
    onKeyDeleteDown: (id) => {
      dispatch(removePage(id))
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SortablePages);