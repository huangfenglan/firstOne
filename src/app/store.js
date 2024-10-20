import { configureStore } from '@reduxjs/toolkit';
import * as reduces from '@/store'

console.log({...reduces},"reduces666");

export default configureStore({
  reducer: {
    ...reduces?.default
  },
});