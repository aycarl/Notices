import { NoticeActionTypes } from "./notice.types";

const INITIAL_STATE = {
  notices: []
}

const noticeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NoticeActionTypes.ADD_NOTICE:
      return Object.assign({}, state, {
        notices: [
          action.payload,
          ...state.notices
        ]
      });

    case NoticeActionTypes.LOAD_NOTICE_BOARD:
      return {
        ...state,
        notices: action.payload
      }

    default:
      return state;
  }
};

export default noticeReducer; 
