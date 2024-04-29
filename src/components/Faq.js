import React, { useState } from 'react';
import './faq.css';

function Faq() {
  const [accordionOpen, setAccordionOpen] = useState({
    collapseOne: false,
    collapseTwo: false,
    collapseThree: false
  });

  const toggleAccordion = (accordionKey) => {
    setAccordionOpen((prevState) => ({
      collapseOne: accordionKey === 'collapseOne' ? !prevState.collapseOne : false,
      collapseTwo: accordionKey === 'collapseTwo' ? !prevState.collapseTwo : false,
      collapseThree: accordionKey === 'collapseThree' ? !prevState.collapseThree : false
    }));
  };

  return (
    <div className="faq_area section_padding_130" id="faq">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 col-lg-6">
            <div className="section_heading text-center wow fadeInUp" data-wow-delay="0.2s" style={{ marginTop: '18px' }}>
              <h3><span>Frequently </span> Asked Questions</h3>
              <p>Appland is completely creative, lightweight, clean & super responsive app landing page.</p>
              <div className="line"></div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-lg-8">
            <div className="accordion faq-accordian" id="faqAccordion">
            <div className="card border-0 wow fadeInUp" data-wow-delay="0.2s">
                <div className="card-header" style={{ marginTop: '18px', cursor: 'pointer' }} onClick={() => toggleAccordion('collapseOne')}>
                  <h6 className={`mb-0 ${accordionOpen.collapseOne ? 'collapsed' : ''}`} aria-expanded={accordionOpen.collapseOne} aria-controls="collapseOne">
                    Why Use Comm for Audio Analysis? <span className={`lni-chevron-${accordionOpen.collapseOne ? 'up' : 'down'}`}></span>
                  </h6>
                </div>
                <div className={accordionOpen.collapseOne ? 'collapse show' : 'collapse'} id="collapseOne" aria-labelledby="headingOne" data-parent="#faqAccordion">
                  <div className="card-body">
                    <p><strong>Question:</strong> Why should I use Comm for analyzing my audio or voice recordings?</p>
                    <p><strong>Answer:</strong> Comm offers advanced audio analysis tools that allow users to gain valuable insights into their speech patterns, tone, and delivery. Whether you're preparing for a presentation, practicing public speaking, or refining your communication skills, Comm's audio analysis features provide actionable feedback to help you improve your vocal performance.</p>
                  </div>
                </div>
              </div>

              <div className="card border-0 wow fadeInUp" data-wow-delay="0.3s">
              <div className="card-header" id="headingTwo" style={{ marginTop: '18px', cursor: 'pointer' }} onClick={() => toggleAccordion('collapseTwo')}>
                <h6 className={`mb-0 ${accordionOpen.collapseTwo ? '' : 'collapsed'}`} aria-expanded={accordionOpen.collapseTwo} aria-controls="collapseTwo">
                  What Can I Analyze with Comm's Audio Tools? <span className={`lni-chevron-${accordionOpen.collapseTwo ? 'up' : 'down'}`}></span>
                </h6>
              </div>
              <div className={accordionOpen.collapseTwo ? 'collapse show' : 'collapse'} id="collapseTwo" aria-labelledby="headingTwo" data-parent="#faqAccordion">
                <div className="card-body">
                  <p><strong>Question:</strong> What aspects of my audio can I analyze using Comm's tools?</p>
                  <p><strong>Answer:</strong> Comm's audio analysis tools enable users to assess various aspects of their voice recordings, including:</p>
                  <ul>
                    <li><strong>Tone and Pitch:</strong> Evaluate the tone and pitch of your voice to ensure clarity and expressiveness.</li>
                    <li><strong>Pace and Cadence:</strong> Analyze the pace and cadence of your speech to maintain engagement and coherence.</li>
                    <li><strong>Vocal Variety:</strong> Assess the range and variation in your voice to convey emotion and emphasis effectively.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card border-0 faq-card wow fadeInUp" data-wow-delay="0.4s">
                <div className="card-header" style={{ marginTop: '18px', cursor: 'pointer' }} onClick={() => toggleAccordion('collapseFour')}>
                  <h6 className={`mb-0 ${accordionOpen.collapseFour ? '' : 'collapsed'}`} aria-expanded={accordionOpen.collapseFour} aria-controls="collapseFour">
                    How to Use Comm's Audio Analysis Tools<span className={`lni-chevron-${accordionOpen.collapseFour ? 'up' : 'down'}`}></span>
                  </h6>
                </div>
                <div className={accordionOpen.collapseFour ? 'collapse show' : 'collapse'} id="collapseFour" aria-labelledby="headingFour" data-parent="#faqAccordion">
                  <div className="card-body">
                    <p><strong>Question:</strong> How do I use Comm's audio analysis tools effectively?</p>
                    <p><strong>Answer:</strong> Analyzing your audio with Comm is simple:
                    <ul>
                      <li>Record Audio: Use Comm to record or upload audio.</li>
                      <li>Select Options: Choose aspects to analyze.</li>
                      <li>Get Feedback: Comm gives detailed feedback.</li>
                      <li>Practice and Refine: Use feedback to improve.</li>
                      <li>Track Progress: Monitor improvements over time.</li>
                    </ul>
                    </p>
                  </div>
                </div>
              </div>

             
              <div className="card border-0 faq-card wow fadeInUp" data-wow-delay="0.4s">
                <div className="card-header" style={{ marginTop: '18px', cursor: 'pointer' }} onClick={() => toggleAccordion('collapseFive')}>
                  <h6 className={`mb-0 ${accordionOpen.collapseFive ? '' : 'collapsed'}`} aria-expanded={accordionOpen.collapseFive} aria-controls="collapseFive">
                    Why Use Comm for Video Analysis?<span className={`lni-chevron-${accordionOpen.collapseFive ? 'up' : 'down'}`}></span>
                  </h6>
                </div>
                <div className={accordionOpen.collapseFive ? 'collapse show' : 'collapse'} id="collapseFive" aria-labelledby="headingFive" data-parent="#faqAccordion">
                  <div className="card-body">
                    <p>Why should I use Comm for video analysis?</p>
                    <p>Comm's video analysis features help assess non-verbal communication, body language, and presentation style. Whether you're preparing for an interview or refining your on-camera presence, Comm's tools provide insights to enhance your performance.</p>
                  </div>
                </div>
              </div>

              <div className="card border-0 wow fadeInUp" data-wow-delay="0.4s">
                <div className="card-header" style={{ marginTop: '18px', cursor: 'pointer' }} onClick={() => toggleAccordion('collapseSix')}>
                  <h6 className={`mb-0 ${accordionOpen.collapseSix ? '' : 'collapsed'}`} aria-expanded={accordionOpen.collapseSix} aria-controls="collapseSix">
                    Why Use Comm for Interview Preparation?<span className={`lni-chevron-${accordionOpen.collapseSix ? 'up' : 'down'}`}></span>
                  </h6>
                </div>
                <div className={accordionOpen.collapseSix ? 'collapse show' : 'collapse'} id="collapseSix" aria-labelledby="headingSix" data-parent="#faqAccordion">
                  <div className="card-body">
                    <p>How can Comm help me prepare for interviews?</p>
                    <p>Comm provides structured interview preparation, offering a range of questions and scenarios to practice. Perfect for job interviews, college admissions, or professional assessments, it helps you build confidence and excel in challenging situations.</p>
                  </div>
                </div>
              </div>

              <div className="card border-0 wow fadeInUp" data-wow-delay="0.4s">
                  <div className="card-header" id="headingSeven" style={{ marginTop: '18px', cursor: 'pointer' }} onClick={() => toggleAccordion('collapseSeven')}>
                    <h6 className={`mb-0 ${accordionOpen.collapseSeven ? '' : 'collapsed'}`} aria-expanded={accordionOpen.collapseSeven} aria-controls="collapseSeven">
                      What Types of Interview Questions Does Comm Include?<span className={`lni-chevron-${accordionOpen.collapseSeven ? 'up' : 'down'}`}></span>
                    </h6>
                  </div>
                  <div className={accordionOpen.collapseSeven ? 'collapse show' : 'collapse'} id="collapseSeven" aria-labelledby="headingSeven" data-parent="#faqAccordion">
                    <div className="card-body">
                      <p>Explore the types of interview questions Comm offers:</p>
                      <ul>
                        <li><strong>Behavioral Questions:</strong> Examine your experiences, skills, and reactions in different contexts.</li>
                        <li><strong>Technical Questions:</strong> Gauge your industry-specific knowledge and skills.</li>
                        <li><strong>Situational Questions:</strong> Test your decision-making and problem-solving through hypothetical scenarios.</li>
                        <li><strong>Industry-Specific Questions:</strong> Address challenges and topics pertinent to your field.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="card border-0 wow fadeInUp" data-wow-delay="0.4s">
                <div className="card-header" id="headingEight" style={{ marginTop: '18px', cursor: 'pointer' }} onClick={() => toggleAccordion('collapseEight')}>
                  <h6 className={`mb-0 ${accordionOpen.collapseEight ? '' : 'collapsed'}`} aria-expanded={accordionOpen.collapseEight} aria-controls="collapseEight">
                    How Can I Use Comm for Interview Preparation?<span className={`lni-chevron-${accordionOpen.collapseEight ? 'up' : 'down'}`}></span>
                  </h6>
                </div>
                <div className={accordionOpen.collapseEight ? 'collapse show' : 'collapse'} id="collapseEight" aria-labelledby="headingEight" data-parent="#faqAccordion">
                  <div className="card-body">
                    <p>Prepare for interviews with Comm by following these steps:</p>
                    <ul>
                      <li><strong>Explore Questions:</strong> Access a wide range of interview questions and familiarize yourself with different formats.</li>
                      <li><strong>Practice Responses:</strong> Use Comm to rehearse answers, focusing on clarity and relevance.</li>
                      <li><strong>Receive Feedback:</strong> Get valuable feedback from peers or Comm's automated tools.</li>
                      <li><strong>Reflect and Refine:</strong> Analyze feedback, refine your answers, and improve your delivery.</li>
                      <li><strong>Build Confidence:</strong> Consistent practice will enhance your confidence and interview readiness.</li>
                    </ul>
                  </div>
                </div>
              </div>

               <div className="card border-0 wow fadeInUp" data-wow-delay="0.4s">
               <div className="card-header" id="headingThree" style={{ marginTop: '18px' }}>
                 <h6 className="mb-0 collapsed" onClick={() => toggleAccordion('collapseThree')} aria-expanded={accordionOpen.collapseThree} aria-controls="collapseThree">
                   Contact form isn't working?<span className="lni-chevron-up"></span>
                 </h6>
               </div>
               <div className={accordionOpen.collapseThree ? 'collapse show' : 'collapse'} id="collapseThree" aria-labelledby="headingThree" data-parent="#faqAccordion">
                 <div className="card-body">
                   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quidem facere deserunt sint animi sapiente vitae suscipit.</p>
                   <p>Appland is completely creative, lightweight, clean & super responsive app landing page.</p>
                 </div>
               </div>
             </div> 
             
            </div>
            <div className="support-button text-center d-flex align-items-center justify-content-center mt-4 wow fadeInUp" data-wow-delay="0.5s">
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
