import React, { useState, useEffect, useContext} from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from './AuthContext'; // Import AuthProvider

function Upload() {
  const { currentUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoFile: null,
  });
  // const [videoUrl, setVideoUrl] = useState('');
  const [userVideos, setUserVideos] = useState([]);

  useEffect(() => {
    // Fetch user's videos when the component mounts
    fetchUserVideos();
  }, [])

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

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'videoFile' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('video_file', formData.videoFile);
  
    // ...
try {
  const response = await fetch('http://127.0.0.1:3000/videos', {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
    },
    body: formDataToSend,
  });

  if (response.ok) {
    Swal.fire({
      title: 'Success!',
      text: 'Video uploaded successfully',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    // Update user's videos after successful upload
    fetchUserVideos();
  } else {
    Swal.fire({
      title: 'Error!',
      text: 'Error uploading video',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
} catch (error) {
  console.error('Error uploading video:', error);
  Swal.fire({
    title: 'Error!',
    text: 'Network error or server is down',
    icon: 'error',
    confirmButtonText: 'OK'
  });
}
// ...

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
                        <h6 className="mb-0">Video File</h6>a
                      </div>
                      <div className="col-md-9 pe-5">
                        <input className="form-control form-control-lg" id="videoFile" type="file" name="videoFile" onChange={handleInputChange} />
                        <div className="small text-muted mt-2">Upload your video file</div>
                      </div>
                    </div>
                    <hr className="mx-n3" />
                    <div className="px-5 py-4">
                      <button type="submit" className="btn btn-primary btn-lg">Upload Video</button> {/* This button triggers form submission */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
     
          {/* Display user's videos using currentUser.videos */}
    <div className="video-preview-container mt-5">
      <h3>User Videos</h3>
      {currentUser && currentUser.videos && currentUser.videos.map(video => (
        <div key={video.id}>
          <h4>{video.title}</h4>
          <video width="100%" controls>
            <source src={`http://127.0.0.1:3000${video.video_url}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>


    </div>
  );
}

export default Upload;
