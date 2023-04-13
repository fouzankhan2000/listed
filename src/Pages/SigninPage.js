import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import '../CssFiles/SigninPage.css';

const SigninPage = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({})

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    navigate('/dashboard');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  }

  useEffect(() => {
    /*global google */
    google.accounts.id.initialize({
      client_id: "736777987895-0eokhg661p84v5f59tk2fd7prs1fs1el.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signin-buttons"),
      { theme: "outline", size: "large", }
    );
    google.accounts.id.prompt();

  }, []);


  return (
    <div className='main-div'>
      <div className='left-div'>
        <h1>Board.</h1>
      </div>

      <div className='right-div'>
        <div className='signin'>
          <h1>Sign In</h1>
          <p>Sign in to your account</p>
        </div>

        <div id='signin-buttons'>
        </div>

        <div className='form'>
          <form onSubmit={handleSubmit}>
            <p>Email address</p>
            <input type='email' />
            <p>Password</p>
            <input type='password' />
            <p><span>Forgot password?</span></p>

            <div className='button'>
              <button type='submit'>Sign in</button>
            </div>
          </form>
        </div>

        <div className='register'>
          <p>Don't have an account? <span>Register here</span></p>
        </div>
      </div>
    </div>
  )
}

export default SigninPage