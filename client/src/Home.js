import React, { useEffect } from "react";
import Header from "./components/Header";
import Input from "./components/Input";
import { getPosts } from "./redux/slices/PostSlice";
import Images from "./components/Images";

const Home = () => {
    return (
        <>
            <Header />
            <Input />
            <Images />
        </>
    );
};

export default Home;
