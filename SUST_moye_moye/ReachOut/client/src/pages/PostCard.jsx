import React, { useState, useEffect } from "react";
import API from "../api/axios.config";
import {
    CloudUpload,

} from "@mui/icons-material";
import { useUserContext } from "../contexts/userContext";
import axios from "axios";

const Comment = ({ author, text, image }) => {
    const [user, setUser] = useState("");
    API.post("/getuser", { id: author })
        .then(function (res) {
            if (res) {
                console.log(res.data.posts[0].name);
                // Set the user name using setUser
                setUser(res.data.posts[0].name);
            }
        })
        .catch(function (error) {
            // Handle error
        });
    return (
        <div className="flex space-x-4">
            <div className="flex-shrink-0">
                <img
                    src="https://via.placeholder.com/40"
                    alt={`${user}'s Profile`}
                    className="w-10 h-10 rounded-full"
                />
            </div>
            <div className="flex-grow">
                <p className="font-semibold">{user}</p>
                <p className="">{text}</p>
                {image ? (
                    <img
                        src={`../src/assets/${image}`}
                        alt="Post Media"
                        className="w-32 h-32 mt-3 mb-3"
                    />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

const CommentInput = ({ post_id }) => {
    const [comment, setComment] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [fileName, setFileName] = useState("");

    const { userData } = useUserContext();

    const handleCommentChange = (event) => {
        setComment(event.target.value);
        // console.log(comment);
    };

    const handleSubmit = async (e) => {
        // console.log(post_id, comment, fileName, userData.user_id);
        if (comment.trim() !== "") {
            API.post("/newcomment", { post_id: post_id, comment_txt: comment, comment_img: fileName, user_id: userData.user_id })
                .then(function (res) {

                })
                .catch(function (error) {
                    // Handle error
                });
            setComment("");
        }
    };

    const handleImageUploadx = async (event) => {
        const file = event.target.files[0];
        // console.log(file);
        setSelectedImage(file);
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await axios.post("http://localhost:8001/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(response.data);
            setFileName(response.data);
            // console.log(fileName);
            // console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            className="max-w-2xl bg-gray-600 rounded-lg p-2 mx-auto mt-2 shadow-md"
        >
            <div className="px-3 mt-2">
                <textarea
                    placeholder="Write your opinion..."
                    className="w-full bg-gray-600 rounded border leading-normal resize-none h-20 py-2 px-3 font-medium"
                    onChange={handleCommentChange}></textarea>
            </div>
            <div className="flex justify-end px-4">
                <label
                    htmlFor="imageUpload1"
                    className="cursor-pointer bg-gray-600 rounded-lg p-1 m-auto font-bold text-white border-gray-400 border-2 border-dotted flex shadow-md text-center"
                >
                    <input
                        type="file"
                        id="imageUpload1"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUploadx}
                    />
                    <CloudUpload className="mr-3" />
                    {selectedImage ? selectedImage.name : "Add Image"}
                </label>
                <button onClick={handleSubmit} className="px-2.5 py-1.5 rounded-md text-white text-bold text-sm bg-green-700">
                    Comment
                </button>

            </div>

        </div>
    );
};


const PostCard = ({ post }) => {
    // Initialize user state
    const [user, setUser] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const id = post.user_id;
        API.post("/getuser", { id })
            .then(function (res) {
                if (res) {
                    console.log(res.data.posts[0].name);
                    // Set the user name using setUser
                    setUser(res.data.posts[0].name);
                }
            })
            .catch(function (error) {
                // Handle error
            });

        API.post("/comments", { post_id: post.post_id })
            .then(function (res) {
                if (res && res.data) {
                    // Use the spread operator to append the new posts to the existing array
                    // console.log(res.data);
                    setComments(() => [...res.data.comments]);
                }
            })
            .catch(function (error) {
                // Handle error
            });

    }, [post.user_id]); // Add post.user_id as a dependency



    return (
        <div className="w-[600px] overflow-hidden shadow-lg ml-4 bg-gray-700 text-white p-4 rounded-lg mb-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                        alt="Your Image"
                        className="rounded-full w-12 h-12"
                    />
                    <p className="text-base">
                        {user} {/* Render the user name */}
                        <br />
                        {post.time}
                    </p>
                </div>
            </div>

            <div className="font-bold text-xl ml-2">{post.post_title}</div>
            <p className="text-base ml-2">{post.text_description}</p>
            {post.image ? (
                <img
                    src={`../src/assets/${post.image}`}
                    alt="Post Media"
                    className="w-full h-auto mt-3 mb-3"
                />
            ) : (
                <></>
            )}

            <div className="w-full bg-gray-600 p-5 rounded-lg shadow-md" id="comments">
                <p className="text-md mb-4 font-abril-fatface border-b-2 pb-2">Comments</p>

                <div className="space-y-4">
                    {comments &&
                        comments.map((e) => (
                            <Comment author={e.user_id} text={e.comment_txt} image={e.comment_img} />
                        ))}
                </div>
            </div>

            <CommentInput post_id={post.post_id} />

        </div>
    );
};

export default PostCard;
