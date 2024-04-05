import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from './AuthContext'; // Import AuthProvider
import Comments from './Comments';
import './upload.css'

function Upload() {
  const { currentUser } = useContext(AuthContext);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');


  const [selectedVideoId, setSelectedVideoId] = useState('');
  
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoFile: null,
  });
  const [userVideos, setUserVideos] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);
  
  

  useEffect(() => {
    fetchUserVideos();
    
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
        setUserVideos(data.videos);
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

  // Modify the handleVideoSelection function to accept only videoId
  
  const handleVideoSelection = (videoId) => {
    const selectedVideo = currentUser.videos.find(video => video.id === videoId);
    if (selectedVideo) {
      setSelectedVideoUrl(`http://127.0.0.1:3000${selectedVideo.video_url}`);
      setSelectedVideoId(videoId);
      // Fetch comments for the selected video
    } else {
      console.error('Selected video not found');
      Swal.fire({
        title: 'Error!',
        text: 'Selected video not found',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };
// Modify the JSX where handleVideoSelection is called to pass only videoId


  
// 
const fetchQuestions = async (questionType) => {
  try {
    const response = await fetch(`http://127.0.0.1:3000/questions?question_type=${questionType}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setQuestions(data);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    Swal.fire({
      title: 'Error!',
      text: 'Failed to fetch questions',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
};

const handleQuestionTypeChange = (questionType) => {
  setSelectedQuestionType(questionType);
  fetchQuestions(questionType);
  setSelectedCategory(null); // Reset selected category when question type changes
};

const [selectedCategory, setSelectedCategory] = useState(null);

// Function to handle category selection
const handleCategorySelect = (category) => {
  setSelectedCategory(selectedCategory === category ? null : category);
};
// commments 

  
  



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

      {/* storytelling structure */}
      <div className="center-container">
  <section className="storytelling-explanation">
    <h2>Storytelling Technique Structure</h2>
    <p>
      In your storytelling technique, you follow a structured approach that consists of several key elements:
    </p>
    <ul>
      <li>Hook</li>
      <li>Get into the heart of the story</li>
      <li>Cutting the fat</li>
      <li>Weaving through the thread</li>
      <li>Landing the plane</li>
    </ul>
    <p>
      Each of these elements plays a crucial role in crafting a compelling story that captivates the audience.
      The audio and video quizzes provided here are designed to help you assess how well you've incorporated
      these storytelling elements into your narratives.
    </p>
  </section>
</div>


      {/* Display user's videos */}

      
      <div className="video-preview-container mt-5">
        <div className="video-list">
          <h3>{currentUser && currentUser.name ? `${currentUser.name}'s Videos` :'My Videos'}</h3>
          {currentUser && currentUser.videos && currentUser.videos.map(video => (
            <div className="video-item" key={video.id} onClick={() => handleVideoSelection(video.id)}>
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
            {/* Render Comments Component Here */}
            <Comments videoId={selectedVideoId} />
          </div>
        )}

      </div>
      
        {/* Category Selection Buttons */}
        <div className="video-selection-section">
        <button onClick={() => handleQuestionTypeChange('audio')} className={`btn ${selectedQuestionType === 'audio' ? 'btn-active' : 'btn-inactive'}`}>
          <i className="fas fa-volume-up"></i> Audio Questions
        </button>
        <button onClick={() => handleQuestionTypeChange('video')} className={`btn ${selectedQuestionType === 'video' ? 'btn-active' : 'btn-inactive'}`}>
          <i className="fas fa-video"></i> Video Questions
        </button>

        <button onClick={() => handleQuestionTypeChange('interview quiz')} className={`btn ${selectedQuestionType === 'interview quiz' ? 'btn-active' : 'btn-inactive'}`}>
          <i className="fas fa-question-circle"></i> Interview Quiz
        </button>
        <div>
        <i>click any of the Category to view the questions</i>
        </div>
        
      </div>

      {/* Category Selection Buttons */}
      <div className="category-selection-buttons">
        
        {selectedQuestionType && Object.entries(questions.reduce((acc, question) => {
          if (!acc[question.category]) {
            acc[question.category] = [];
          }
          acc[question.category].push(question);
          return acc;
        }, {})).map(([category, _questionsInCategory]) => (
          <button key={category} onClick={() => handleCategorySelect(category)} className={`btn ${selectedCategory === category ? 'btn-active' : 'btn-inactive'}`}>
            {category}
          </button>
        ))}
      </div>

      {/* Display Questions for the Selected Category */}
      {selectedCategory && (
        <div className="questions-list">
          <h4>{selectedCategory}</h4>
          <ul>
            {questions
              .filter(question => question.category === selectedCategory)
              .map((question, index) => (
                <li key={index}>{question.maswali}</li>
              ))}
          </ul>
        </div>
      )}

    
     
    



      </div>
    
      
  
  );
}

export default Upload;