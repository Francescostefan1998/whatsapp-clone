export const getUserProfile = (token) => {
  console.log();
  return async (dispatch, getState) => {
    const options = await {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(token);
    const res = await fetch(`http://localhost:3001/users/me`, options);
    const userData = await res.json();
    console.log(userData);
    dispatch({
      type: "GET_USER_PROFILE",
      payload: userData,
    });
  };
};

export const getUserChats = (chatId) => {
  console.log();
  return async (dispatch, getState) => {
    console.log(chatId);
    let chats = [];
    for (let i = 0; i < chatId.length; i++) {
      const res = await fetch(`http://localhost:3001/chats/${chatId[i]}`);
      const userData = await res.json();
      chats = [...chats, userData];
    }

    console.log(chats);
    dispatch({
      type: "GET_USER_CHATS",
      payload: chats,
    });
  };
};
