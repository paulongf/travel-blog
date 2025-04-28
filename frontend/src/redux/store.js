import { configureStore } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { blogdApi } from "./features/blogs/blogsApi";

export const store = configureStore({
    reducer: {
        [blogdApi.reducerPath] : blogdApi.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(blogdApi.middleware),
})