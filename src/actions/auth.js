import * as api from '../api';

export const login = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);

    dispatch({ type: 'AUTH', data });

    navigate('/');
  } catch (error) {
    console.log(error);
    if (error.response) {
      if (error.response.status === 400) {
        alert('Invalid Password');
      } else if (error.response.status === 404) {
        alert('Invalid email');
      }
    }
  }
};

export const register = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);

    dispatch({ type: 'AUTH', data });

    navigate('/');
  } catch (error) {
    console.log(error);
  }
};
