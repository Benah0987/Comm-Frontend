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
                <p>Have you ever felt the frustration of struggling to effectively communicate your ideas? Like you, I've experienced firsthand the challenges that arise from poor communication.</p>
                <ul>
                  <li>Impacted my professional development</li>
                  <li>Hindered my ability to form meaningful relationships</li>
                  <li>Caused missed opportunities for romantic connections</li>
                  <li>Not understanding how important negotiating skills are important in life</li>
                </ul>
                <p>But amidst these challenges, I've found guidance and inspiration in the transformative teachings of Vinh Giang, a keynote speaker whose insights have reshaped the way we perceive effective communication.</p>

                <p>Sign up now and unleash your creativity! Upload exciting videos and let us assist you in unlocking your full potential. Get ready to embark on a journey of self-expression and success!</p>

              </div>


              <div className="btn-container">
                  <Link to="/upload" className="btn">Signup Now</Link>
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
              <button onClick={handlePlayPause}>
                <i className="fas fa-play" aria-label="Play/Pause"></i>
              </button>
              <button onClick={handleMute}>
                <i className="fas fa-volume-up" aria-label="Mute/Unmute"></i>
              </button>
            </div>
          </header>
        </div>
      </div>
      
      {/* Tabs */}
      <section id="tabs">
        <div className="container" style={{ backgroundColor: '#3f51b5' }}>
          <h6 className="section-title h1 text-black"> Master communication</h6>
          
          <p className="text-center italicized-text larger-font text-white">
            In communication, a speaker's word only count for a small percentage of his or her effort. The pitch and tone of the voice, the speed and rhythm of the spoken words, and the pauses between those words may tell more than what is being communicated.
            <br/>
            "Communication: 7% words, 38% tone, 55% body language. From 'Never Split the Difference', maximize impact, minimize words."
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
            <Tab.Content className="py-3 px-3 px-sm-0 b" style={{ backgroundColor: '#3f51b5' }}>
              <Tab.Pane eventKey="storytelling">
                <p>Storytelling is a powerful tool for capturing attention, conveying complex ideas, and engaging audiences emotionally. A well-crafted narrative can make information more memorable and impactful.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="emotional-intelligence">
                <p>Emotional intelligence involves understanding and managing one's own emotions and recognizing and empathizing with the emotions of others. It is crucial for effective communication, building relationships, and navigating social situations.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="body-language">
                <p>Body language, including gestures, facial expressions, and posture, can communicate a wealth of information without saying a word. Being aware of and using body language effectively can enhance communication and convey confidence and credibility.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="tonality">
                <p>Tonality refers to the pitch, pace, volume, and rhythm of speech. It can convey emotions, emphasize key points, and maintain listener engagement. Mastering tonality can make spoken communication more dynamic and persuasive.</p>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </section>
      {/* ./Tabs */}

      {/* Blockquote Section */}
     

      {/* End of Blockquote Section */}
    </div>
  );
}

export default Homepage;
