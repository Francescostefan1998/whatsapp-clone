export const getUserProfile = (token) => {
  return async (dispatch, getState) => {
    const options = await {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(token);
    const res = await fetch(
      `https://whatsapp-clone-backend-production-8895.up.railway.app/users/me`,
      options
    );
    const userData = await res.json();
    dispatch({
      type: "GET_USER_PROFILE",
      payload: userData,
    });
  };
};

export const getUserChats = (chatId) => {
  return async (dispatch, getState) => {
    let chats = [];
    for (let i = 0; i < chatId.length; i++) {
      const res = await fetch(
        `https://whatsapp-clone-backend-production-8895.up.railway.app/chats/${chatId[i]}`
      );
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

export const getSingleChat = (chatId) => {
  console.log(chatId);
  return async (dispatch, getState) => {
    const res = await fetch(
      `https://whatsapp-clone-backend-production-8895.up.railway.app/chats/${chatId}`
    );
    const chat = await res.json();

    dispatch({
      type: "GET_SINGLE_CHAT",
      payload: chat,
    });
  };
};
