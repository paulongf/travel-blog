import { configureStore } from '@reduxjs/toolkit';
import { blogsApi } from './features/blogs/blogsApi';
import authApi from './features/auth/authApi';
import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    [blogsApi.reducerPath]: blogsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogsApi.middleware, authApi.middleware),
});
