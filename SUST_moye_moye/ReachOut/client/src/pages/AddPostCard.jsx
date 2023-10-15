import React, { useState } from 'react';
import { useEffect } from 'react';
import {
    CloudUpload,

} from "@mui/icons-material";
import API from '../api/axios.config';
import { useClassroomContext } from '../contexts/classroomContext';
import { useUserContext } from '../contexts/userContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddPostCard() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedFile, setSelectedFile] = useState("");
    const [fileName, setFileName] = useState("");
    const { classList, focusedClass, setFocusedClass } = useClassroomContext();
    const { userData } = useUserContext();

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await axios.post("http://localhost:8001/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setFileName(response.data);
            // console.log(fileName);
            // console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    };



    const sendDoubt = () => {
        const sub_id = focusedClass.class_id;
        const user_id = userData.user_id;
        
        API.post("/newdoubt", { sub_id, user_id, title, description, fileName}).then((res) => {
            toast.success("Doubt posted successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }).catch((error) => {
            // Display an error message
            toast.error("Doubt posting failed. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        });
    };

    return (
        <div className="w-[600px] overflow-hidden shadow-lg ml-4 bg-gray-700 text-white p-4 rounded-lg mb-2">
            <div className="flex flex-col items-center justify-between">
                <h1 className='text-xl mb-2'>
                    Ask a doubt?
                </h1>
                <textarea
                    className="w-full mb-2 rounded-lg bg-gray-600 text-white border-2 p-2 border-dotted focus:outline-none focus:border-gray-500 font-bold font-dancing-script"
                    placeholder="Enter problem title"
                    rows="1"
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />
                <textarea
                    className="w-full mb-2 rounded-lg bg-gray-600 text-white border-2 p-2 border-dotted focus:outline-none focus:border-gray-500 font-bold font-dancing-script"
                    placeholder="Enter problem description"
                    rows="5"
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label
                    htmlFor="imageUpload"
                    className="cursor-pointer bg-gray-600 rounded-lg p-3 m-auto font-bold text-white border-gray-400 border-2 border-dotted flex shadow-md w-full items-center justify-center text-center"
                >
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                    <CloudUpload className="mr-3" />
                    {selectedFile ? selectedFile.name : "Add Image"}
                </label>

                <button className='mt-2 rounded-lg p-2 bg-green-600 text-center w-full' onClick={sendDoubt}>
                    Post
                </button>
            </div>
        </div>
    );
}

export default AddPostCard;
