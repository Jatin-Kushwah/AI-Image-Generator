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

// export const deletePost = createAsyncThunk("/deletePost", async (body) => {
//     try {
//         const response = await axiosClient.delete("/api/post", body);
//         console.log(response, body);
//     } catch (error) {
//         return Promise.reject(error);
//     }
// });

const postSlice = createSlice({
    name: "postSlice",
    initialState: {
        posts: [],
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
        });
        // builder.addCase(deletePost.fulfilled, (state, action) => {
        //     state.posts = state.posts.filter(
        //         (post) => post._id !== action.payload
        //     );
        // });
    },
});

export default postSlice.reducer;
