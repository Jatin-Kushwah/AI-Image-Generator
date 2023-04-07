import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../axisoClient";

export const getPosts = createAsyncThunk("/getPosts", async () => {
    try {
        const response = await axiosClient.get("/api/post");
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
});

const postSlice = createSlice({
    name: "postSlice",
    initialState: {
        posts: [],
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
        });
    },
});

export default postSlice.reducer;
