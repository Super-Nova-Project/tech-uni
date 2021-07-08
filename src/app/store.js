import { configureStore } from '@reduxjs/toolkit';
import signUp from '../features/reducers/signUp';
import signIn from '../features/reducers/signIn';

export const store = configureStore({
  reducer: {
    signUp : signUp,
    signIn : signIn,
  },
});
