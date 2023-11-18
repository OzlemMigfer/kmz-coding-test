export const loginSuccess = username => ({
  type: 'LOGIN_SUCCESS',
  payload: {username},
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const userLogin = (username, password) => {
  return async dispatch => {
    try {
        const response = await fetch('https://apiv5.akilliticaretim.com/api/v5/sf/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'GUID': '24BE-DB0E-D75E-4060',
          },
          body: JSON.stringify({
            username: 'destek@akilliticaret.com',//username
            password: 'at253545',//password
          }),
        });
  
        if (response.status) {
          const result = await response.json();
          dispatch(loginSuccess(result.username));
        } else {
          console.error('API Hatası:', response.status, response.statusText, response.message);
        }
      } catch (error) {
        console.error('Login Hata:', error.message);
      }
  };
};
