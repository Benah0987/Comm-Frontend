import React, { useState } from 'react';
import videoSrc from './Vinhh4.mp4';
import './homepage.css';
import { Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Homepage() {
  const [activeTab, setActiveTab] = useState('storytelling');

  const handlePlayPause = () => {
    const video = document.getElementById('myVideo');
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleMute = () => {
    const video = document.getElementById('myVideo');
    video.muted = !video.muted;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <section className="text-section my-5">
            <div className="container">
              <div className="row">
                <div className="col-md-10 mx-auto" style={{ fontSize: '18px' }}>
                  <p>Unlock your full potential in communication with Comm! Are you ready to become a more confident and effective communicator?</p>
                  <p>Whether you're a professional looking to enhance your presentation skills, a language learner striving for fluency, or an educator seeking to engage students with dynamic content, Comm is here to help you succeed.</p>
                  <p>Watch our introductory video on the right to see how Comm can transform your communication skills. Don’t just take our word for it — see it in action!</p>
                </div>
                <div className="btn-container">
                  <Link to="/signup" className="btn">Signup Now</Link>
                </div>
                <div className="arrow-container">
                  <i className="fas fa-arrow-right" aria-label="Watch Video"></i>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="col-md-6">
          <header className="video-header">
            <video id="myVideo" playsInline autoPlay loop>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="controls">
              <button onClick={handlePlayPause} className="play-pause-btn">
                <i className="fas fa-play" aria-label="Play/Pause"></i>
              </button>
              <button onClick={handleMute} className="mute-btn">
                <i className="fas fa-volume-up" aria-label="Mute/Unmute"></i>
              </button>
            </div>
          </header>
        </div>
      </div>
      
      {/* Tabs Section */}
      <section id="tabs">
        <div className="container" style={{ backgroundColor: '#3f51b5' }}>
          <h6 className="section-title h1 text-black">Master Communication</h6>
          <p className="text-center italicized-text larger-font text-white">
            Communication is key in every aspect of life. Whether you're delivering a presentation, engaging in conversation, or teaching others, effective communication skills are essential for success.
          </p>

          <Tab.Container activeKey={activeTab} onSelect={key => setActiveTab(key)}>
            <Nav variant="tabs" className="nav-fill text-black">
              <Nav.Item>
                <Nav.Link eventKey="storytelling">Storytelling</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="emotional-intelligence">Emotional Intelligence</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="body-language">Body Language</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tonality">Tonality</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="py-3 px-3 px-sm-0" style={{ backgroundColor: '#3f51b5' }}>
              <Tab.Pane eventKey="storytelling">
                <p>Storytelling is a powerful tool for capturing attention and engaging audiences emotionally. A well-crafted narrative can make information more memorable and impactful.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="emotional-intelligence">
                <p>Emotional intelligence involves understanding and managing one's emotions. It is crucial for effective communication and building relationships.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="body-language">
                <p>Body language can communicate a wealth of information. Using it effectively can enhance communication and convey confidence.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="tonality">
                <p>Tonality can convey emotions, emphasize key points, and maintain listener engagement. Mastering tonality can make spoken communication more persuasive.</p>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </section>
      {/* End of Tabs Section */}
    </div>
  );
}

export default Homepage;
