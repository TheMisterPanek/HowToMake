import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removePage } from '../actions/actions.js';
import { selectCurrentPage } from '../actions/actions.js';
import Preview from './SortablePages.js';
import Page from './page.js';
import CurrentPage from './current_page.js';
import Rnd from 'react-rnd';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';


const Pages = ({ pages, index, onPageClick, onKeyDeleteDown }) => {
  const PagesPreview = (pages)=>{
     return pages.map(page =>
        <Page
          key = {page.id}  
          {...page}
          onClick={() => onPageClick(page.id)}
          onKeyPress={() => onKeyDeleteDown(page.id)}
        />
      );
  }

  let currentPage = pages[index];
  let cp = null;
  if (currentPage){
    cp = <CurrentPage title={currentPage.title} position={currentPage.position} blocks={currentPage.blocks}/>
  }
  return (
  <div className="pages">
    {/* <div className="preview">
      {PagesPreview(pages)}
    </div>*/}
    <Preview pages = {pages}/>
   {cp}
  </div>
  )
};

Pages.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    position: PropTypes.number,
    blocks: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.object.isRequired,   
  }).isRequired).isRequired,  
  }).isRequired).isRequired,
  index: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired,
  onKeyDeleteDown: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    pages: state.getIn(["manual", "pages"]).toJS(),
    index: state.getIn(["manual", "current_page"]),
  };
};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Pages);
