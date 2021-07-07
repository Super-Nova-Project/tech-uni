import { configureStore } from '@reduxjs/toolkit';
import signUp from '../features/signUp';
import signIn from '../features/signIn';

export const store = configureStore({
  reducer: {
    signUp : signUp,
    signIn : signIn,
  },
});
