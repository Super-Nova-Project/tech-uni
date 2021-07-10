const axios = require('axios').default;
const api = 'https://eraser-401.herokuapp.com';


export const signUp = (data) => (dispatch, state) => {
  console.log("inside signUp");
  // console.log(dispatch);
  console.log('-i-f-sg-dsf-wsef-ds-',data);
  let obj = {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName
  }
  console.log('my obj', obj);
  axios( {
    method: 'post',
        url: `/signup`,
        mode: 'cors',
        baseURL: api,
        data: JSON.stringify(obj),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-origin': api
        }
  })
    .then((response)=> {
      console.log(response.data.user);
      dispatch(postAction(response.data));
    })
    .catch(function (error) {
      console.log('in Eror',error);
    });
}

export const postAction = payload => {
  return {
    type: 'POSTUSER',
    payload: payload
  }
}


export const active = (name) => {
  return {
    type: 'ACTIVE',
    payload: name,
  };
};