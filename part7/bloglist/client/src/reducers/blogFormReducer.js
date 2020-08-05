const initialState = {
  title: '',
  author: '',
  url: '',
  visible: false,
};

const blogFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TITLE': {
      return { ...state, title: action.title };
    }
    case 'SET_AUTHOR': {
      return { ...state, author: action.author };
    }
    case 'SET_URL': {
      return { ...state, url: action.url };
    }
    default: return state;
  }
};

export const setTitle = (title) => async (dispatch) => {
  dispatch({
    type: 'SET_TITLE',
    title,
  });
};

export const setAuthor = (author) => async (dispatch) => {
  dispatch({
    type: 'SET_AUTHOR',
    author,
  });
};

export const setUrl = (url) => async (dispatch) => {
  dispatch({
    type: 'SET_URL',
    url,
  });
};

export default blogFormReducer;
