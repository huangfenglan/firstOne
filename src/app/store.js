import { configureStore } from '@reduxjs/toolkit';
import * as reduces from '@/store';

export default configureStore({
  reducer: {
    ...reduces?.default,
  },
});
