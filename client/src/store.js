const { configureStore } = require('@reduxjs/toolkit');
const { default: userReducer } = require('./reducers/userReducer');
const { default: teamListReducer } = require('./reducers/teamListReducer');


const store = configureStore({
  reducer: {
    user: userReducer,
    teamList:teamListReducer
  },
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
const RootState = store.getState;
const AppDispatch = store.dispatch;

module.exports = {
  store,
  RootState,
  AppDispatch,
};