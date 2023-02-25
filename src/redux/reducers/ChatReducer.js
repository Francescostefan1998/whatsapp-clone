const initialState = {
  chats: [],
};

const userChatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_CHATS":
      return {
        ...state,
        chats: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default userChatsReducer;
