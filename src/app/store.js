import { configureStore } from '@reduxjs/toolkit';
import test from '../features/testReducer';

export const store = configureStore({
  reducer: {
    test: test,
  },
});
