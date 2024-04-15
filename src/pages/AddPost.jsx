import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null); // State to hold the selected image
    const navigate = useNavigate();
    const userId = localStorage.getItem('_id'); // Read the userId from local storage

    const handleAddPost = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('userId', userId);
            formData.append('image', image); // Append image to form data

            await axios.post('http://localhost:3000/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set content type to multipart form-data
                },
            });
            navigate('/');
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Update the image state when a new image is selected
    };

    return (
        <div className="max-w-xl mx-auto mt-10 w-full">
            <h1 className="text-3xl font-bold mb-4">Add New Post</h1>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">
                    Content
                </label>
                <textarea
                    id="content"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">
                    Image
                </label>
                <input
                    type="file"
                    id="image"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    onChange={handleImageChange}
                />
            </div>
            <div className="flex justify-end">
                {userId && (
                    <>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                            onClick={handleAddPost}
                        >
                            Add
                        </button>
                        <button
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AddPost;
