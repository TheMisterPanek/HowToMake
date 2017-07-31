export function createPage(manual_id, title) {
  return{
    type: 'CREATE_PAGE',
    manual_id,
    title,
  }
};

export const addPage = (page) => {
  return {
    type: 'ADD_PAGE',
    page,
  };
};

export function removePage(id) {
  return{
    type: 'REMOVE_PAGE',
    id,
  }
};


export const deletePage = (id) => {
  return {
    type: 'DELETE_PAGE',
    id,
  };
};

export const selectCurrentPage = (id) => {
  return {
    type: 'SELECT_CURRENT_PAGE',
    id,
  };
};

export const createTextBlock = (text) => {
  return {
    type: 'ADD_TEXT',
    text
  };
};
export const createImageBlock = (image) => {
  return {
    type: 'ADD_IMAGE',
    url: image.url,
    height: image.height,
    width: image.width,
  };
};

export const createVideoBlock = (url) => {
  return {
    type: 'ADD_VIDEO',
    url,
  };
};

export const moveBlock = (id,x,y)=>{
  return{
    type: 'MOVE_BLOCK',
    x: x,
    y: y,
    block_id: id
  }
}

export const sortPages = (id, oldPosition, newPosition) =>{
  return{
    type: 'SORT_PAGE',
    pageId: id,
    oldPosition: oldPosition,
    newPosition: newPosition,
  }
}