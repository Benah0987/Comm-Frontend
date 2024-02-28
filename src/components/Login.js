import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Assuming correct path
import './login.css';

function Login() {
  const { login } = useContext(AuthContext);
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const user = await login(email, password);
        // Redirect after successful login
        
        console.log('Logged in user:', user);
    } catch (error) {
        console.error('Failed to log in:', error);
        // Handle error state (e.g., display an error message)
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
                    <h3 className="display-4">Log In</h3>
                    <p className="text-muted mb-4">Welcome back!</p>
                    <form onSubmit={handleLogin}>
                      <div className="form-group mb-3">
                        <input id="inputEmail" type="email" placeholder="Email address" required className="form-control rounded-pill border-0 shadow-sm px-4" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className="form-group mb-3">
                        <input id="inputPassword" type="password" placeholder="Password" required className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>
                      <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Log in</button>
                      <div className="text-center d-flex justify-content-between mt-4">
                        <p>website by <a href="https://portfolio-five-blush-84.vercel.app/" className="font-italic text-muted">
                          <u>Benayah</u></a></p>
                        {/* Updated message with Link component for navigation to /login */}
                        <p className="font-italic text-muted">Register as a New User? <Link to="/signup">SignUp</Link></p>
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

export default Login;
