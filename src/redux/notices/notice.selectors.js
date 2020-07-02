import { createSelector } from 'reselect';

const selectNoticeBoard = state => state.noticeBoard;

export const selectAllNotices = createSelector(
  [selectNoticeBoard],
  noticeBoard => noticeBoard.notices
);