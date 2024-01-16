import React,{useState} from 'react';
import './Login.css'
import logo from '../../assets/Netflix_logo.png'
import Signup from '../../components/Signup/Signup';
import Signin from '../../components/Signin/Signin';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isSignin,setIsSignin] = useState(false)
    const [signupEmail,setSignupEmail] = useState('')
    const handleEmailChange = (e) => {
        setSignupEmail(e.target.value)
    }
    const setSignin = () => {
        setIsSignin(true)
    }

    const navigate = useNavigate()
    return (
        <section className="login">
            <header className="login__nav">
                <img src={logo} alt='Netflix Logo' 
                className="login__nav-logo" 
                onClick={() => window.location.reload(false)}
                />
                
                <button 
                className="login__nav-button"
                onClick={() => setSignin()}>Sign In</button>
            </header>
            {
                isSignin ?
                <Signin signupEmail={signupEmail}/>
                :
                <Signup 
                handleEmailChange={handleEmailChange} 
                setSignin={setSignin} 
                signupEmail={signupEmail}
                />
            }
            
        </section>
    );
};

export default Login;