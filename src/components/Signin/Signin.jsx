import  './Signin.css'
import { useState } from 'react';
import React from 'react';
import { auth } from '../../firebaseconfig';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'
import { useDispatch } from 'react-redux';
const Signin = ({signupEmail}) => {
  const [email,setEmail] = useState(signupEmail?signupEmail:'')
  const [password,setPassword] = useState('')
  const dispatch = useDispatch()
  const [isError,setError] = useState(false)
  
  const handleSignin = (e) => {
    e.preventDefault()
    if(email.trim() == '' || password.trim() == '') {
      alert('Email/Password should not be empty!')
      return;
    }
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
    if(!pattern.test(email)) {
      alert('Please enter valid email id!')
      return;
    }
    signInWithEmailAndPassword(
      auth,
      email,
      password
    ).then((authUser) => {
      console.log(authUser)
    }).catch((err) => setError(true))
  } 
  const registerNewUser = (e) => {
    e.preventDefault()
    if(email.trim() == '' || password.trim() == '') {
      alert('Email/Password should not be empty!')
      return;
    }
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
    if(!pattern.test(email)) {
      alert('Please enter valid email id!')
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((authUser) => {
      console.log(authUser)
    }).catch((err) => console.log(err))
  }
    return (
        <form className="signin-form">
              
                <h1>Sign In</h1>
             
              <div className="form-group">
                    <div>
                        <input 
                        type="text" 
                        id="email" 
                        required={true}
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}></input>
                        <label htmlFor="email">Email</label>
                    </div>
              </div>
              <div className="form-group">
                    <div>
                        <input 
                        type="password" 
                        id="password" 
                        required={true}
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <label htmlFor="password">Password</label>
                    </div>
              </div>
              {isError && <span className="error">Email/Password is incorrect!</span>}
                <button type="submit" onClick={handleSignin}>Sign In</button>

                <div className="signup-desc">
                  <span>New to Netflix?</span>  
                  <span onClick={registerNewUser}>Sign up now.</span>
                </div>  
        </form>
    );
};

export default Signin;