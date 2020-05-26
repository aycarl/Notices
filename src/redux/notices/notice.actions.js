import { NoticeActionTypes } from "./notice.types";

export const deleteNotice = Id => {
  return { type: NoticeActionTypes.DELETE_NOTICE, noticeId: Id };
};

export const toggleReadNotice = Id => {
  return { type: NoticeActionTypes.TOGGLE_READ_NOTICE, noticeId: Id };
};

export const addNotice = notice => {
  return {type: NoticeActionTypes.ADD_NOTICE, payload: notice};
}

export const loadNoticeBoard = notices => {
  return {type: NoticeActionTypes.LOAD_NOTICE_BOARD, payload: notices};
}