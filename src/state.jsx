import get from 'lodash-es/get';
import set from 'lodash-es/set';
import { createStore } from 'redux';


const ACTION_SET_STATE = 0;
const ACTION_UNSET_STATE = 0;


const _unsetAtPath = (state, path) => {
  const tokens = state.split('.');
  const lastIndex = tokens.length - 1;
  for (let t = 0; t < lastIndex; t += 1) {
    const nextPath = path[tokens[t]];
    if (!nextPath) {
      return;
    }
    path = nextPath;
  }
  delete path[tokens[lastIndex]];
};

const reducer = (state = {}, action) => {
  const stateCopy = Object.assign({}, state);
  switch (action.type) {
    case ACTION_SET_STATE:
      set(stateCopy, action.path, action.value);
      break;
    case ACTION_UNSET_STATE:
      _unsetAtPath(stateCopy, action.path);
      break;
    default:
      break;
  }
  return stateCopy;
};


export const store = createStore(reducer);

export const setState = (path, value) => {
  store.dispatch({
    type: ACTION_SET_STATE,
    path,
    value,
  });
};

export const unsetState = (path) => {
  store.dispatch({
    type: ACTION_UNSET_STATE,
    path,
  });
};

export const getState = (path) => {
  const state = store.getState();
  return get(state, path);
};
