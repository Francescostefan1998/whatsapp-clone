import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "../reducers/UserProfileReducer.js";
import userChatsReducer from "../reducers/ChatReducer.js";
const mainReducer = {
  user: userProfileReducer,
  chats: userChatsReducer,
};

export const store = configureStore({
  reducer: mainReducer,
});
