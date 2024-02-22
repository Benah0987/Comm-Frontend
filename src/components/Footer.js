import React from 'react';
import './footer.css'

function Footer() {
  return (
    <footer style={{  backgroundColor: '#000', color: 'white', marginTop: '20px', bottom: '0', width: '100%' }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-2">
            <h6 className="font-weight-bold social-icon-hover">Storytelling</h6>
          </div>
          <div className="col-md-2">
            <h6 className="font-weight-bold social-icon-hover">Tonality</h6>
          </div>
          <div className="col-md-2">
            <h6 className="font-weight-bold social-icon-hover">Rate of Speech</h6>
          </div>
          <div className="col-md-2">
            <h6 className="font-weight-bold social-icon-hover">Audience Engagement</h6>
          </div>
          <div className="col-md-2">
            <h6 className="font-weight-bold social-icon-hover">Genuine Connections</h6>
          </div>
        </div>
        <hr className="my-4" />
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <p style={{fontSize: '20px', fontWeight: 'bold' }}>
              The quality of your life is directly influenced by your ability
              to communicate with confidence and clarity.
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="d-flex justify-content-center">
                <a href="https://web.facebook.com/rudboi.clarks" target="_blank" rel="noreferrer" className="text-white me-4 social-icon-hover">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com/WBenayah" target="_blank" rel="noreferrer" className="text-white me-4 social-icon-hover">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.youtube.com/channel/UCdMrcOKdO1SOazKeC-5V50w" target="_blank" rel="noreferrer" className="text-white me-4 social-icon-hover">
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="https://www.instagram.com/wanyoike_benayah/" target="_blank" rel="noreferrer" className="text-white me-4 social-icon-hover">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="www.linkedin.com/in/benayah-wanyoike-9a3192236" target="_blank" rel="noreferrer" className="text-white me-4 social-icon-hover">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/Benah0987" target="_blank" rel="noreferrer" className="text-white me-4 social-icon-hover">
                  <i className="fab fa-github"></i>
                </a>
                      

            </div>
          </div>
        </div>
        
      </div>
      <div className="text-center mt-4" style={{ backgroundColor: 'orange', color: 'white' }}>
          <p>
            &copy; {new Date().getFullYear()} Comm. All rights reserved. Wanyoike Benayah
          </p>
        </div>
    </footer>
  );
}

export default Footer;
