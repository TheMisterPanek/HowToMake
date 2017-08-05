import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removePage } from '../actions/actions.js';
import { selectCurrentPage } from '../actions/actions.js';
import {TiArrowUnsorted} from 'react-icons/lib/ti';
import {GoX} from 'react-icons/lib/go'

const DragHandle = SortableHandle(() =>{ 

  return(
    <TiArrowUnsorted className = "arrow-unsorted"/>
  )});

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
    <div className="row">
      <div className="col-2 preview-page-move">{AllowEdit(edit_mode,<DragHandle/>)}</div>
      <div className="col-8 preview-page-text">{title}</div>
      <div className="col-2 preview-page-remove">{AllowEdit(edit_mode, <GoX onClick ={()=>onKeyPress()}/>)}</div>
    </div>
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
      if(confirm('Seriosly?'))
        {
          dispatch(removePage(id));
        }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SortablePages);