import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPosts } from "../redux/slices/PostSlice";
import download from "../assets/download.png";
import deleteIcon from "../assets/delete.png";
import FileSaver from "file-saver";
import axiosClient from "../axisoClient";

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

    const downloadImage = (image, _id) => {
        FileSaver.saveAs(image, `download-${_id}.jpg`);
    };

    const deleteImage = async (id) => {
        try {
            await axiosClient.delete("/api/post", {
                data: { id },
            });
        } catch (err) {
            console.log(err);
        }
    };

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
                        className={`relative group  ${
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
                        <div className="h-10 flex items-center justify-between absolute opacity-0 transition-opacity duration-200 group-hover:opacity-100 bottom-0 left-0 right-0 bg-white bg-opacity-80 rounded-sm px-2 py-1 text-gray-700 ">
                            <img
                                src={deleteIcon}
                                alt="delete"
                                className="w-6 h-6 object-contain cursor-pointer hover:scale-[115%] duration-300 transition-transform ease-in-out ml-3"
                                onClick={() => deleteImage(image._id)}
                            />
                            <img
                                src={download}
                                alt="download"
                                className="w-5 h-5 object-contain cursor-pointer hover:scale-[115%] duration-300 transition-transform ease-in-out mr-3"
                                onClick={() =>
                                    downloadImage(image.photo, image._id)
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Images;
