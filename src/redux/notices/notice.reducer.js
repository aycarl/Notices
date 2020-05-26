import { NoticeActionTypes } from "./notice.types";

const noticeReducer = (state = [], action) => {
  switch (action.type) {
    case NoticeActionTypes.ADD_NOTICE:
      return [...state, action.payload];

    case NoticeActionTypes.LOAD_NOTICE_BOARD:
      return [...state, action.payload]

    default:
      return state;
  }
};

export default noticeReducer; 
