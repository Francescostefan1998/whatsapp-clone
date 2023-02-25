export const getUserProfile = (token) => {
  console.log();
  return async (dispatch, getState) => {
    /*const options = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzdmNWNmYWQ4MzkzNTAwMTVlOGM0YTUiLCJpYXQiOjE2NzQ0NjUxMjgsImV4cCI6MTY3NTY3NDcyOH0.w0jJ0XgMxZeslQivku-2ce45Dx9rwGNzfuz2_fesLS8",
        },
      };*/
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

    /*const res = await fetch(
          `https://hilarious-toothbrush-production.up.railway.app/users/63d14dae49b19c47d1ba1938`
        );
        const userData = await res.json();
        dispatch({
          type: "GET_USER_PROFILE",
          payload: userData,
        });*/
  };
};
