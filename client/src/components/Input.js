import React, { useState } from "react";
import axiosClient from "../axisoClient";
import { useDispatch } from "react-redux";
import { getPosts } from "../redux/slices/PostSlice";

function Input() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);

    const dispatch = useDispatch();

    const handleGetSuggestion = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get("/api/openai");
            const cleanedResponse = response.data.suggestion.replace(/\n/g, "");
            setInput(cleanedResponse);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setGenerating(true);
            const response = await axiosClient.post("/api/openai", {
                prompt: input,
            });
            setInput("");
            dispatch(getPosts());
        } catch (error) {
            console.error(error);
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="m-10">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col lg:flex-row shadow-md border rounded-md lg:divide-x shadow-slate-400/10"
            >
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                        loading
                            ? "Getting new suggestion..."
                            : "Type Something..."
                    }
                    className="flex-1 p-3 lg:p-1 outline-none border rounded-md"
                />
                <button
                    className={`p-3 lg:p-1 font-bold ${
                        input
                            ? "text-white bg-myColor3"
                            : "bg-white text-gray-300 cursor-not-allowed"
                    }`}
                    type="submit"
                    disabled={!input}
                >
                    {generating ? "Generating..." : "Generate"}
                </button>
                <button
                    onClick={handleSubmit}
                    className="p-3 lg:p-1 bg-myColor1 text-white font-bold"
                    type="button"
                >
                    Use Suggestion
                </button>
                <button
                    onClick={handleGetSuggestion}
                    className="p-3 lg:p-1 bg-white text-myColor2 font-bold"
                    type="button"
                >
                    Get Suggestion
                </button>
            </form>
        </div>
    );
}

export default Input;
