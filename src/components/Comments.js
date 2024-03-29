import React, { useState, useEffect, useContext } from 'react';
// Import AuthContext to use the current user's information
import { AuthContext } from './AuthContext';// Adjust the import path as necessary

function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const { currentUser } = useContext(AuthContext); // Access the current user from context

  useEffect(() => {
    fetchComments();
  }, [videoId]); // Re-fetch comments if videoId changes

  const fetchComments = async () => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await fetch(`http://localhost:3000/videos/${videoId}/comments`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      {/* Display a message or a comment input box for the current user */}
      <p>Commenting as: <strong>{currentUser?.username || 'Guest'}</strong></p>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              {/* Display the commenter's name if available, else show a default */}
              {comment.user_name || 'User'} {comment.user_id}: {comment.content}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments to display.</p>
      )}
    </div>
  );
}

export default Comments;
