import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/PostSlice";

export default configureStore({
    reducer: {
        postReducer,
    },
});
