/* eslint-disable import/no-anonymous-default-export */
const initialState = {
  user:{},
  token:''
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
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}