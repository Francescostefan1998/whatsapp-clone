const initialState = {
  chat: null,
};

const singleChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SINGLE_CHAT":
      return {
        ...state,
        chat: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default singleChatReducer;
