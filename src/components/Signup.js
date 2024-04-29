import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Assuming correct path
import './login.css';

function Signup() {
  const { signup } = useContext(AuthContext);
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(username, email, password);
       // Redirect after successful signup
    } catch (error) {
      setError('Failed to sign up. Please check your credentials and try again.');
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row no-gutter">
          {/* The image half */}
          <div className="col-md-6 d-none d-md-flex bg-image"></div>
          {/* The content half */}
          <div className="col-md-6 bg-light">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <h3 className="display-4">Join Comm Today!</h3>
                    <p className="text-muted mb-4">Unlock your full communication potential.</p>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <form onSubmit={handleSignup}>
                      <div className="form-group mb-3">
                        <input id="inputUsername" type="text" placeholder="Username" required className="form-control rounded-pill border-0 shadow-sm px-4" value={username} onChange={(e) => setUsername(e.target.value)} />
                      </div>
                      <div className="form-group mb-3">
                        <input id="inputEmail" type="email" placeholder="Email address" required className="form-control rounded-pill border-0 shadow-sm px-4" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className="form-group mb-3">
                        <input id="inputPassword" type="password" placeholder="Password" required className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>
                      <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign up</button>
                      <div className="text-center d-flex justify-content-between mt-4">
                        <p className="font-italic text-muted">Already have an account? <Link to="/login">Login here</Link></p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
