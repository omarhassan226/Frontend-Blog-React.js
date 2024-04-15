import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPost = () => {
    const navigate = useNavigate();
    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: null // State to hold the selected image
    });
    
    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/posts/${id}`);
                setPostData(response.data);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        fetchPost();
    }, [id]);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value });
    };

    const handleImageChange = e => {
        setPostData({ ...postData, image: e.target.files[0] }); // Update the image state with the selected file
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", postData.title);
            formData.append("content", postData.content);
            formData.append("image", postData.image); // Append image to form data

            await axios.put(`http://localhost:3000/posts/${id}`, formData);
            console.log("Post updated successfully");
            navigate("/");
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4 w-1/2 mx-auto">Edit Post</h1>
            <form onSubmit={handleSubmit} className="w-1/2 mx-auto">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={postData.title}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={postData.content}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*" // Limit to image files only
                        onChange={handleImageChange}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Update Post</button>
            </form>
        </div>
    );
};

export default EditPost;
