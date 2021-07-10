const axios = require('axios').default;
const api = 'https://eraser-401.herokuapp.com';


export const signUp = (data) => async (dispatch, state) => {
  console.log("inside signUp");
  // console.log(dispatch);
  console.log('-i-f-sg-dsf-wsef-ds-', data);
  let isValid = await validteEmail(data.email);
  console.log({ isValid });
  if (isValid) {
    let obj = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName
    }
    console.log('my obj', obj);
    axios({
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
      .then((response) => {
        console.log(response.data.user);
        dispatch(postAction(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    // console.log('invalid');
    dispatch(notValidEmail());
  }
}

////////////// validate email ////////////////////
async function validteEmail(email) {
  let success = false;
  const mailBoxLayerAPI = ` http://apilayer.net/api/check?access_key=2da14f88d53e3eb1dfb279b9593bde17&email=${email}&smtp=1&format=1`;
  await fetch(mailBoxLayerAPI, {
    method: 'get',
    mode: 'cors',
  })
    .then(data => data.json())
    .then(data => {
      // console.log({ data })
      success = data.success;
    })
    .catch(console.error);
  // console.log({ success })
  return success;

}


export const postAction = payload => {
  return {
    type: 'POSTUSER',
    payload: payload
  }
}

export const notValidEmail = () => {
  return {
    type: 'NOTVALID',
    payload: false
  }
}
export const active = (name) => {
  return {
    type: 'ACTIVE',
    payload: name,
  };
};