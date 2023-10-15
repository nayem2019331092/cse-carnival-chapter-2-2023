import API from "../api/axios.config";
import Sidebar from "../components/Sidebar";
import { useClassroomContext } from "../contexts/classroomContext";
import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import PostCard from "./PostCard";
import AddPostCard from "./AddPostCard";

export default function Community() {
    const { classList, focusedClass, setFocusedClass } = useClassroomContext();
    const { isLoggedIn } = useAuthContext();

    // Use useState to initialize posts as an empty array
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {
            const id = focusedClass.class_id;
            API.post("/community", { id })
                .then(function (res) {
                    if (res && res.data) {
                        // Reverse the array and set it in the state
                        setPosts([...res.data.posts.reverse()]);
                    }
                })
                .catch(function (error) {
                    // Handle error
                });

        }
    }, [isLoggedIn, focusedClass]);

    return (
        <div className="mt-24 flex">
            <div className="w-72 min-h-screen fixed">
                <Sidebar />
            </div>
            <div className="flex-grow flex-col pl-72 flex items-center justify-center">
                <AddPostCard />
                {posts && posts.map((post) => (
                    <PostCard post={post} />
                ))}
            </div>
        </div>
    );
}
