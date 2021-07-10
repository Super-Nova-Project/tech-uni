/* eslint-disable import/no-anonymous-default-export */
const initialState = {
  user: {},
  token: '',
  isValid:true
}

export default (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'POSTUSER':
      return {
        user: payload.user,
        token: payload.token
      }
    case 'SIGNEDIN':
      let signedIn = payload;
      return { ...state, signedIn };
    case 'NOTVALID':
      // console.log({state},'1----------------')
      let isValidEmail = payload;
      return {
        user: state.user,
        token: state.token,
        isValid: isValidEmail
      }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}