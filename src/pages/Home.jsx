import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [image, setImage] = useState(null); // State to hold the selected image
  const userId = localStorage.getItem("_id");
  const accessToken = localStorage.getItem("accessToken");
  const isLoggedIn = !!accessToken;
  const { isDarkMode } = useAuth();

  useEffect(
    () => {
      const fetchPosts = async () => {
        try {
          const response = await axios.get("http://localhost:3000/posts");
          setPosts(response.data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };

      fetchPosts();
    },
    [posts]
  );

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`);
      setPosts(posts.filter(post => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleAddPost = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newPostTitle);
      formData.append("content", newPostContent);
      formData.append("userId", userId);
      formData.append("image", image); // Append image to form data

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      console.log(formData);

      const postResponse = await axios.post(
        "http://localhost:3000/posts",
        formData
      );

      const newPost = postResponse.data;
      setPosts([...posts, newPost]);
      setShowPopup(false);
      setNewPostTitle("");
      setNewPostContent("");
      setImage(null); // Reset the image state
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return <div className={` px-4 w-1/2`}>
      <h1
        className={`text-4xl rounded p-8 mb-6 text-center ${isDarkMode
          ? "text-white bg-slate-800"
          : "text-gray-800 bg-gray-500"}`}
      >
        Posts
      </h1>
      {posts.map(post =>
        <div
          key={post._id}
          className={`border ${isDarkMode
            ? "border-gray-400 bg-slate-800"
            : "border-gray-300 bg-gray-500"} rounded p-8 mb-6 text-center`}
          style={{ marginBottom: "20px" }} // Add margin to separate posts
        >
          <label
            htmlFor="title"
            className={`block text-${isDarkMode
              ? "white"
              : "gray-800"} font-semibold text-${isDarkMode
              ? "slate-100"
              : "gray-800"} mb-1 border ${isDarkMode
              ? "border-red-300"
              : "border-gray-200"} rounded text-center`}
          >
            Title
          </label>
          <h2 className={`text-${isDarkMode ? "gray-200" : "gray-700"} mb-2`}>
            {post.title}
          </h2>
          <label
            htmlFor="content"
            className={`block text-${isDarkMode
              ? "border-red-400"
              : "gray-800"} font-semibold text-${isDarkMode
              ? "white"
              : "gray-800"} mb-1 border ${isDarkMode
              ? "border-red-400"
              : "border-gray-200"} rounded text-center`}
          >
            Content
          </label>
          <p className={`text-${isDarkMode ? "gray-200" : "gray-700"}`}>
            {post.content}
          </p>
          {/* Display the image */}
          {post.image &&
            <img
              src={`http://localhost:3000/${post.image}`}
              alt="Post Image"
              className="rounded mt-4  mx-auto"
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />}
          {userId === post.userId &&
            <div className="mt-4">
              <Link
                to={`/editPost/${post._id}`}
                className={`text-blue-500 ${isDarkMode
                  ? "bg-yellow-300 rounded p-2 text-white"
                  : "bg-yellow-200 rounded p-2 text-slate-800"} mr-4 hover:bg-yellow-400 hover:text-black duration-300`}
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post._id)}
                className={` ${isDarkMode
                  ? "bg-red-500 rounded p-2 text-white hover:bg-red-600 hover:text-black duration-300"
                  : "bg-gray-300 rounded p-2 text-slate-800 hover:bg-red-400 duration-300"} `}
              >
                Delete
              </button>
            </div>}
        </div>
      )}
      {showPopup && <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded">
            <h2 className="text-xl font-bold mb-4">Add New Post</h2>
            <label htmlFor="new-post-title" className="block mb-2">
              Title
            </label>
            <input type="text" id="new-post-title" className={`border ${isDarkMode ? "border-gray-800" : "border-gray-300 text-gray-700"} rounded mb-4 p-2`} value={newPostTitle} onChange={e => setNewPostTitle(e.target.value)} />
            <label htmlFor="new-post-content" className="block mb-2 border-gray-800" style={{ color: "gray" }}>
              Content
            </label>
            <textarea id="new-post-content" className={`border ${isDarkMode ? "border-gray-800" : "border-gray-300 text-gray-700"} rounded mb-4 p-2`} value={newPostContent} onChange={e => setNewPostContent(e.target.value)} />
            <label htmlFor="new-post-image" className="block mb-2">
              Image
            </label>
            <input type="file" id="new-post-image" className="mb-4" onChange={e => setImage(e.target.files[0])} />
            <div>
              <button onClick={handleCancel} className="bg-blue-500 text-white px-4 py-2 rounded mr-3 hover:bg-blue-600">
                Cancel
              </button>
              <button onClick={handleAddPost} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add
              </button>
            </div>
          </div>
        </div>}
      <div className="flex justify-between">
        <div className="flex justify-end mt-8">
          <button onClick={() => setShowPopup(true)} className={`${isDarkMode ? "bg-slate-800 text-slate-200" : "text-gray-700 bg-gray-500"} hover:bg-yellow-200 duration-300 px-4 py-2 rounded hover:text-slate-800`}>
            Add Post With Popup
          </button>
        </div>
        <div className="flex justify-end mt-8">
          <Link to="/addPost">
            <button
              className={`${isDarkMode
                ? "bg-slate-800 text-slate-200"
                : "text-gray-700 bg-gray-500"} hover:bg-yellow-200 duration-300 px-4 py-2 rounded hover:text-slate-800`}
            >
              Add Post With Form
            </button>
          </Link>
        </div>
      </div>
    </div>;
};

export default Home;
