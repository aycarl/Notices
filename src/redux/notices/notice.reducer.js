import { NoticeActionTypes } from "./notice.types";

const noticeReducer = (state = [], action) => {
  switch (action.type) {
    case NoticeActionTypes.ADD_NOTICE:
      return [...state, action.payload];

    default:
      return state;
  }
};

export default noticeReducer; 
