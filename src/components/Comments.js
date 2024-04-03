import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import './comments.css';

function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchComments();
  }, [videoId]);

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

  const handleCommentSubmit = async () => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await fetch(`http://localhost:3000/videos/${videoId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment }),
      });
      if (!response.ok) throw new Error('Failed to post comment');
      const data = await response.json();
      setComments([...comments, data]);
      setNewComment('');
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <p>Comments: <strong>What are your thoughts on the video</strong></p>
      <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
      <button className="custom-button" onClick={handleCommentSubmit}>Post Comment</button>

      <div className="comments-container">
        {comments.length > 0 ? (
          <div>
            {comments.map((comment) => (
              <div key={comment.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f9f9f9' }}>
                <strong style={{ color: 'black' }}>{currentUser?.username}</strong>: <span style={{ color: 'blue' }}>{comment.content}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No comments to display.</p>
        )}
      </div>
    </div>
  );
}

export default Comments;
