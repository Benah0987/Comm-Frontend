import React, { useState } from 'react';
import './faq.css';

function Faq() {
  const [accordionOpen, setAccordionOpen] = useState({
    whyUseComm: false,
    whatIsComm: false,
    howCommWorks: false,
    videoUpload: false,
    reviewAndFeedback: false,
    videoAnalysis: false,
    userManagement: false,
    searchAndFilter: false,
    notifications: false,
    security: false,
    // Add more toggles as needed
  });

  const toggleAccordion = (accordionKey) => {
    setAccordionOpen((prevState) => ({
      ...prevState,
      [accordionKey]: !prevState[accordionKey],
    }));
  };

  return (
    <div className="faq_area section_padding_130" id="faq">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-lg-6">
            <div className="section_heading text-center wow fadeInUp" data-wow-delay="0.2s">
              <h3>Frequently Asked Questions</h3>
              <p>Explore common questions about Comm and its features.</p>
              <div className="line"></div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-lg-8">
            <div className="accordion faq-accordian" id="faqAccordion">

              {/* Why Use Comm */}
              <div className="card border-0 wow fadeInUp" data-wow-delay="0.2s">
                <div className="card-header" onClick={() => toggleAccordion('whyUseComm')}>
                  <h6 className={`mb-0 ${accordionOpen.whyUseComm ? '' : 'collapsed'}`}>
                    Why Use Comm? <span className={`lni-chevron-${accordionOpen.whyUseComm ? 'up' : 'down'}`}></span>
                  </h6>
                </div>
                <div className={accordionOpen.whyUseComm ? 'collapse show' : 'collapse'}>
                  <div className="card-body">
                    Comm is a comprehensive web application designed for video management, review, and analysis, providing users with valuable insights and feedback.
                  </div>
                </div>
              </div>

              {/* What is Comm */}
              <div className="card border-0 wow fadeInUp" data-wow-delay="0.2s">
                <div className="card-header" onClick={() => toggleAccordion('whatIsComm')}>
                  <h6 className={`mb-0 ${accordionOpen.whatIsComm ? '' : 'collapsed'}`}>
                    What is Comm? <span className={`lni-chevron-${accordionOpen.whatIsComm ? 'up' : 'down'}`}></span>
                  </h6>
                </div>
                <div className={accordionOpen.whatIsComm ? 'collapse show' : 'collapse'}>
                  <div className="card-body">
                    Comm is a state-of-the-art platform for uploading, reviewing, and analyzing videos, offering a seamless and user-friendly interface.
                  </div>
                </div>
              </div>

              {/* How Comm Works */}
              <div className="card border-0 wow fadeInUp" data-wow-delay="0.2s">
                <div className="card-header" onClick={() => toggleAccordion('howCommWorks')}>
                  <h6 className={`mb-0 ${accordionOpen.howCommWorks ? '' : 'collapsed'}`}>
                    How Does Comm Work? <span className={`lni-chevron-${accordionOpen.howCommWorks ? 'up' : 'down'}`}></span>
                  </h6>
                </div>
                <div className={accordionOpen.howCommWorks ? 'collapse show' : 'collapse'}>
                  <div className="card-body">
                    Comm integrates seamlessly with various technologies to offer efficient video management, analysis, and feedback functionalities.
                  </div>
                </div>
              </div>

              {/* Video Upload */}
              {/* Review and Feedback */}
              {/* Video Analysis */}
              {/* User Management */}
              {/* Search and Filter */}
              {/* Notifications */}
              {/* Security */}
              {/* Add more FAQ entries as needed */}

            </div>
            <div className="support-button text-center d-flex align-items-center justify-content-center mt-4 wow fadeInUp">
              <i className="lni-emoji-sad"></i>
              <p className="mb-0 px-2">Can't find your answers?</p>
              <a href="#">Contact us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
