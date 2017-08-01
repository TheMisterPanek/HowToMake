import { fromJS } from 'immutable';
import { getSubscription } from '../cable.js'

const manual = (state = fromJS({}), action) => {
  const getChanel = ()=>{
    return getSubscription({ channel: "ManualsChannel",manual_id: state.get("manual_id")});
  }
  console.log(state);
  let pages = state.get("pages");
  let pageIndex = pages.findIndex((page) => page.get('id') == action.id);
  let currentPage = pages.find((page)=>page.get('position') == state.get('current_page')+1);
  switch (action.type) {
    case 'CREATE_PAGE':
      getChanel().perform('add_page', { title: action.title, manual_id: action.manual_id });
      return state;
    case 'ADD_PAGE':
      return state.set("pages", pages.push(fromJS(action.page)));
    case 'UPDATE_PAGES':
      pages = pages.map(page => {
        page = page.set('position', ( action.newOrder.indexOf(page.get('id'))+1))
        return page;
      });
      pages = pages.sortBy(page => page.get('position'));
      return state.set("pages", pages);
    case 'REMOVE_PAGE':
      getChanel().perform('delete_page', { id: action.id });
      return state;
    case 'DELETE_PAGE':
      let pageByIndex = pages.get(pageIndex);
      pages = pages.delete(pageIndex);
      return state.set("pages", pages.map((page) => {
        if (page.get("position") > pageByIndex.get("position")) {
         page = page.set("position", page.get("position") -1);
        }
        return page;
      }));
    case 'SELECT_CURRENT_PAGE':
      return state.set("current_page", pageIndex);
    case 'SORT_PAGE':
      let hashToSend = {page_id: action.pageId,oldPosition: action.oldPosition, newPosition:action.newPosition};
      getChanel().perform('sort_page',hashToSend);
      if(oldPosition!=newPosition){
        let newPages;
        if(oldPosition-newPosition<0)
          {
             newPages = state.get('pages').map((page)=>{
               if(page.get('position')>newPosition  && page.get('position')!=state.get('pages').length)
                {
                  page.set('position',page.get('position')+1);
                }
             });
          }
          else{
            newPages = state.get('pages').map((page)=>{
               if(page.get('position')<newPosition && page.get('positioni')!=1)
                {
                  page.set('position',page.get('position')-1);
                }
             });
          }
      }
      state.set('pages',newPages);
      return state;
    //======== BLOCK ========
    case 'ADD_VIDEO':
      let data_video = {current_page_id: currentPage.get('id'), url: action.url};
      getChanel().perform('add_videoblock',data_video);
      return state;
    case 'ADD_TEXT':
      let data_text = {current_page_id: currentPage.get('id'), text: action.text};
      getChanel().perform('add_textblock',data_text);
      return state;
    case 'ADD_IMAGE':
      let data_image = { 
        url: action.url, 
        height: action.height, 
        width: action.width, 
        x:0,
        y:0 ,
        current_page_id: currentPage.get('id') 
      };
      getChanel().perform('add_imageblock', data_image);
      return state;
      //==== Moves Blocks ======
    case 'MOVE_BLOCK':
      let page,blockIndex,blockByIndex;
      let current_page = state.get('current_page'); 
      page = pages.get(current_page);
      blockIndex = page.get("blocks").findIndex( (block) => block.get('id') == action.block_id);
      if (blockIndex < 0) { return state }

      blockByIndex = page.getIn(["blocks", blockIndex]);
      blockByIndex = blockByIndex.updateIn(["data", "x"], x => action.x);
      blockByIndex = blockByIndex.updateIn(["data", "y"], y => action.y);
      getChanel().perform('move_block', {
        block_id: action.block_id,
        data: blockByIndex.get("data"),
      });
      return state.setIn(["pages", current_page, "blocks", blockIndex], blockByIndex);
    case 'RESIZE_BLOCK':
      current_page = state.get('current_page'); 
      page = pages.get(current_page);
      blockIndex = page.get("blocks").findIndex( (block) => block.get('id') == action.block_id);
      if (blockIndex < 0) { return state }

      blockByIndex = page.getIn(["blocks", blockIndex]);
      blockByIndex = blockByIndex.updateIn(["data", "width"], x => x+action.w);
      blockByIndex = blockByIndex.updateIn(["data", "height"], y => y+action.h);
      switch(action.direction){
        case 'topLeft':
          blockByIndex = blockByIndex.updateIn(["data", "x"], x => x - action.w);
          blockByIndex = blockByIndex.updateIn(["data", "y"], y => y - action.h);
          break;
        case 'top':
        case 'topRight':
          blockByIndex = blockByIndex.updateIn(["data", "y"], y => y - action.h);
          break;
        case 'left':
        case 'bottomLeft':
          blockByIndex = blockByIndex.updateIn(["data", "x"], x => x - action.w);
          break;
        default: break;
      }
      getChanel().perform('resize_block', {
        block_id: blockByIndex.get('id'),
        data: blockByIndex.get("data"),
      });
      return state.setIn(["pages", current_page, "blocks", blockIndex], blockByIndex);
      // let newData = action.block.data;
      // newData['x'] = action.x;
      // newData['y'] = action.y;
      // getChanel().perform('move_block',{block_id: action.block.id, data:{ ...newData}})
      // return state;
    default:
      return state;
  }
};

export default manual;