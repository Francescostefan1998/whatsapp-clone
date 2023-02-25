import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "../reducers/UserProfileReducer.js";
import userChatsReducer from "../reducers/ChatReducer.js";
import singleChatReducer from "../reducers/SingleChatReducer.js";
const mainReducer = {
  user: userProfileReducer,
  chats: userChatsReducer,
  chat: singleChatReducer,
};

export const store = configureStore({
  reducer: mainReducer,
});
