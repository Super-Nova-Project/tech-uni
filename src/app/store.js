import { configureStore } from '@reduxjs/toolkit';
import signUp from '../features/reducers/signUp';
import signIn from '../features/reducers/signIn';
import currentCourse from '../features/reducers/currentCourse';

export const store = configureStore({
  reducer: {
    signUp : signUp,
    signIn : signIn,
    currentCourse
  },
});
