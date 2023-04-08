import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/slices/PostSlice";

function Images() {
    const dispatch = useDispatch();
    const [generating, setGenerating] = useState(false);

    const images = useSelector((state) => state?.postReducer.posts);

    useEffect(() => {
        setGenerating(true);
        const fetchData = async () => {
            try {
                await dispatch(getPosts());
            } catch (error) {
                console.log(error);
            } finally {
                setGenerating(false);
            }
        };
        fetchData();
    }, []);

    const sortedImages = [...(images?.posts || [])].sort((a, b) =>
        b._id.localeCompare(a._id)
    );

    const downloadImage = (image) => {};

    return (
        <div>
            {generating && (
                <p className="text-center font-medium text-gray-500">
                    Getting your images...
                </p>
            )}

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-0 md:px-10">
                {sortedImages?.map((image, i) => (
                    <div
                        key={image._id}
                        className={`relative ${
                            i === 0 && "md:col-span-2 md:row-span-2"
                        } hover:scale-[103%] duration-200 transition-transform ease-in-out
                  
                  `}
                    >
                        <img
                            height={802}
                            width={802}
                            src={image.photo}
                            alt={image._id}
                            className="w-full shadow-2xl rounded-sm drop-shadow-lg"
                        />
                        <button
                            onClick={() => downloadImage(image)}
                            className="absolute top-2 right-2 bg-white rounded-md px-2 py-1 text-gray-700 hover:bg-gray-100"
                        >
                            Download
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Images;
