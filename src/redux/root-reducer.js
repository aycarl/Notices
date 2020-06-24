import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer'
import noticeReducer from './notices/notice.reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['noticeBoard']
}

const rootReducer = combineReducers({
  user: userReducer,
  noticeBoard: noticeReducer
});

export default persistReducer(persistConfig, rootReducer)