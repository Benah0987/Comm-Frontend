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
  
  const [activeTab, setActiveTab] = useState('hook');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  

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
      if (xhr.status === 200 || xhr.status === 201) { // Adjusted condition
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

      <div className="p-5 bg-white rounded shadow mb-5">
          {/* Rounded tabs */}
          <h2 style={{ textAlign: 'center', marginBottom: '5px' }}>The StoryTelling Structure</h2>
          <ul id="myTab" role="tablist" className="nav nav-tabs nav-pills flex-column flex-sm-row text-center bg-light border-0 rounded-nav">
              <li className="nav-item flex-sm-fill">
                  <a
                    id="hook-tab"
                    onClick={() => handleTabChange('hook')}
                    data-toggle="tab"
                    href="#hook"
                    role="tab"
                    aria-controls="hook"
                    aria-selected={activeTab === 'hook' ? 'true' : 'false'}
                    className={`nav-link border-0 text-uppercase font-weight-bold ${activeTab === 'hook' ? 'active' : ''}`}
                  >
                    1. Hook
                  </a>
              </li>
              <li className="nav-item flex-sm-fill">
                  <a
                    id="heart-tab"
                    onClick={() => handleTabChange('heart')}
                    data-toggle="tab"
                    href="#heart"
                    role="tab"
                    aria-controls="heart"
                    aria-selected={activeTab === 'heart' ? 'true' : 'false'}
                    className={`nav-link border-0 text-uppercase font-weight-bold ${activeTab === 'heart' ? 'active' : ''}`}
                  >
                   2. Heart of the Story
                  </a>
              </li>
              <li className="nav-item flex-sm-fill">
                  <a
                    id="cutting-tab"
                    onClick={() => handleTabChange('cutting')}
                    data-toggle="tab"
                    href="#cutting"
                    role="tab"
                    aria-controls="cutting"
                    aria-selected={activeTab === 'cutting' ? 'true' : 'false'}
                    className={`nav-link border-0 text-uppercase font-weight-bold ${activeTab === 'cutting' ? 'active' : ''}`}
                  >
                    3. Cutting the Fat
                  </a>
              </li>
              <li className="nav-item flex-sm-fill">
                  <a
                    id="weaving-tab"
                    onClick={() => handleTabChange('weaving')}
                    data-toggle="tab"
                    href="#weaving"
                    role="tab"
                    aria-controls="weaving"
                    aria-selected={activeTab === 'weaving' ? 'true' : 'false'}
                    className={`nav-link border-0 text-uppercase font-weight-bold ${activeTab === 'weaving' ? 'active' : ''}`}
                  >
                   4. Weaving the Thread
                  </a>
              </li>
              <li className="nav-item flex-sm-fill">
                  <a
                    id="landing-tab"
                    onClick={() => handleTabChange('landing')}
                    data-toggle="tab"
                    href="#landing"
                    role="tab"
                    aria-controls="landing"
                    aria-selected={activeTab === 'landing' ? 'true' : 'false'}
                    className={`nav-link border-0 text-uppercase font-weight-bold ${activeTab === 'landing' ? 'active' : ''}`}
                  >
                   5. Landing the Plane
                  </a>
              </li>
          </ul>
      <div id="myTabContent" className="tab-content">
          <div id="hook" role="tabpanel" aria-labelledby="hook-tab" className={`tab-pane fade px-4 py-5 ${activeTab === 'hook' ? 'show active' : ''}`}>
              <p className="text-muted" style={{ fontSize: '18px' }}>The Hook: Start your story with an engaging hook that grabs the audience's attention and makes them want to hear more.</p>
          </div>
          <div id="heart" role="tabpanel" aria-labelledby="heart-tab" className={`tab-pane fade px-4 py-5 ${activeTab === 'heart' ? 'show active' : ''}`}>
              <p className="text-muted" style={{ fontSize: '18px' }}>Getting into the Heart of the Story: Dive deep into the core of your story, sharing the essential experiences, emotions, and truths that you want to convey.</p>
          </div>
          <div id="cutting" role="tabpanel" aria-labelledby="cutting-tab" className={`tab-pane fade px-4 py-5 ${activeTab === 'cutting' ? 'show active' : ''}`}>
              <p className="text-muted" style={{ fontSize: '18px' }}>Cutting the Fat: Remove any elements that don't serve the story or distract from the main message, keeping the narrative focused and impactful.</p>
          </div>
          <div id="weaving" role="tabpanel" aria-labelledby="weaving-tab" className={`tab-pane fade px-4 py-5 ${activeTab === 'weaving' ? 'show active' : ''}`}>
              <p className="text-muted" style={{ fontSize: '18px' }}>Weaving Through the Thread: Ensure your story has a clear thread that ties the beginning, middle, and end together, making the narrative cohesive and compelling.</p>
          </div>
          <div id="landing" role="tabpanel" aria-labelledby="landing-tab" className={`tab-pane fade px-4 py-5 ${activeTab === 'landing' ? 'show active' : ''}`}>
              <p className="text-muted" style={{ fontSize: '18px' }}>Landing the Plane: Conclude your story in a way that leaves a lasting impression, ensuring the audience takes away the key message or lesson.</p>
          </div>
        

          </div>
          {/* End rounded tabs */}
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