const axios = require('axios').default;
const api = 'https://eraser-401.herokuapp.com/';

export const signUp = () => (dispatch, state) => {
  console.log("inside signUp");
  console.log(dispatch);
  console.log({state});

  axios.post(`${api}/signup`, {
    email: state.email,
    password: state.password,
    firstName: state.firstName,
    lastName: state.lastName,
    gender: state.gender,
    birthDate: state.birthDate
  })
    .then(function (response) {
      console.log(response);
      dispatch(postAction(response.body));
    })
    .catch(function (error) {
      console.log(error);
    });
    
}

export const postAction = payload => {
  return {
    type: 'POST',
    payload: payload
  }
}


export const active = (name) => {
  return {
    type: 'ACTIVE',
    payload: name,
  };
};