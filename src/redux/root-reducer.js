import { combineReducers } from 'redux'

import userReducer from './user/user.reducer'
import noticeReducer from './notices/notice.reducer'

export default combineReducers({
  user: userReducer
});