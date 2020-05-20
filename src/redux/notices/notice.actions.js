import NoticeActionTypes from "./notice.types";

export const deleteNotice = (Id) => {
  return { type: NoticeActionTypes.DELETE_NOTICE, noticeId: Id };
};

export const toggleReadNotice = (Id) => {
  return { type: NoticeActionTypes.TOGGLE_READ_NOTICE, noticeId: Id };
};
