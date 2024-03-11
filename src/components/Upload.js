import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from './AuthContext'; // Import AuthProvider
import './upload.css'

function Upload() {
  const { currentUser } = useContext(AuthContext);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoFile: null,
  });
  const [userVideos, setUserVideos] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');


  useEffect(() => {
    fetchUserVideos();
    fetchQuestions(); // Fetch questions initially
  }, []);

  const fetchUserVideos = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/videos', {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserVideos(data.videos); // Assuming the response contains an array of videos
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Error fetching user videos',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.error('Error fetching user videos:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Network error or server is down',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true); // Start uploading

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('video_file', formData.videoFile);

    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://127.0.0.1:3000/videos', true);
    xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("jwtToken")}`);

    xhr.upload.onprogress = function(event) {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setUploadProgress(progress);
      }
    };

    xhr.onload = function() {
      setIsUploading(false); // Stop uploading
      if (xhr.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Video uploaded successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        fetchUserVideos(); // Refresh the list of videos
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Error uploading video',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      setUploadProgress(0); // Reset progress
    };

    xhr.onerror = function() {
      setIsUploading(false); // Stop uploading
      console.error('Error uploading video:', xhr.responseText);
      Swal.fire({
        title: 'Error!',
        text: 'Network error or server is down',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      setUploadProgress(0); // Reset progress
    };

    xhr.send(formDataToSend);
  };

  const handleVideoSelection = (videoUrl) => {
    setSelectedVideoUrl(`http://127.0.0.1:3000${videoUrl}`);
  };
// 

const fetchQuestions = async (type) => {
  try {
    const response = await fetch(`http://127.0.0.1:3000/questions/${type}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }

    const { questions } = await response.json();
    console.log(questions); // Log the fetched questions for debugging

    // Assuming the response contains an array of categories and questions
    setQuestions(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
};



  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: '#2779e2' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-9">
              <h1 className="text-white mb-4">Upload Video</h1>
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body">
                  <form onSubmit={handleSubmit}> {/* Attach handleSubmit to the form's onSubmit event */}
                    <div className="row align-items-center pt-4 pb-3">
                      <div className="col-md-3 ps-5">
                        <h6 className="mb-0">Title</h6>
                      </div>
                      <div className="col-md-9 pe-5">
                        <input type="text" className="form-control form-control-lg" placeholder="Enter title" name="title" onChange={handleInputChange} />
                      </div>
                    </div>
                    <hr className="mx-n3" />
                    <div className="row align-items-center py-3">
                      <div className="col-md-3 ps-5">
                        <h6 className="mb-0">Description</h6>
                      </div>
                      <div className="col-md-9 pe-5">
                        <textarea className="form-control" rows="3" placeholder="Enter description" name="description" onChange={handleInputChange}></textarea>
                      </div>
                    </div>
                    <hr className="mx-n3" />
                    <div className="row align-items-center py-3">
                      <div className="col-md-3 ps-5">
                        <h6 className="mb-0">Video File</h6>
                      </div>
                      <div className="col-md-9 pe-5">
                        <input className="form-control form-control-lg" id="videoFile" type="file" name="videoFile" onChange={handleInputChange} />
                        <div className="small text-muted mt-2">Upload your video file here</div>
                      </div>
                    </div>
                    <hr className="mx-n3" />
                    <div className="px-5 py-4">
                    {/* Conditional rendering for progress bar */}
                    {isUploading && (
                      <div className="progress" style={{ marginBottom: '1rem' }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${uploadProgress}%` }}
                          aria-valuenow={uploadProgress}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {Math.round(uploadProgress)}%
                        </div>
                      </div>
                    )}
                    <button type="submit" className="btn btn-primary btn-lg">
                      {isUploading ? 'Uploading...' : 'Upload Video'}
                    </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </section>
      

      {/* Display user's videos */}
      
      <div className="video-preview-container mt-5">
        <div className="video-list">
          <h3>{currentUser && currentUser.name ? `${currentUser.name}'s Videos` :'My Videos'}</h3>
          {currentUser && currentUser.videos && currentUser.videos.map(video => (
            <div className="video-item" key={video.id} onClick={() => handleVideoSelection(video.video_url)}>
              <h4>{video.title}</h4>
            </div>
          ))}
        </div>

        {selectedVideoUrl && (
          <div className="video-player">
            <video width="100%" controls key={selectedVideoUrl}>
              <source src={selectedVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
      
        {/* Question category buttons */}
        // Inside your JSX component
    <div className="category-buttons">
      <button onClick={() => fetchQuestions('video')}>Video Questions</button>
      <button onClick={() => fetchQuestions('audio')}>Audio Questions</button>
    </div>


      {/* Display questions */}
      {questions.length > 0 && (
        <div className="question-container">
          {questions.map((category, index) => (
            <div className="category" key={index}>
              <h3>{category.category}</h3>
              {category.questions.map((question, questionIndex) => (
                <div className="question-item" key={questionIndex}>
                  <p>Question: {question}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      
  </div>
  );
}

export default Upload;
