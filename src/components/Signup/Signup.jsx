import './Signup.css'
import React from 'react';

const Signup = ({handleEmailChange,signupEmail,setSignin}) => {
    return (
        <section className="signup">
            <h1>Enjoy big movies, hit series and more from ₹129.</h1>
            <p>Join today. Cancel anytime.</p>
            <h2>Ready to watch? Enter your email to create or restart your membership.</h2>

            <form className="signup-form">
                <div className="form-group">
                    <div>
                        <input 
                            type="email"  
                            value={signupEmail} 
                            onChange={(e) =>handleEmailChange(e)}
                        />
                        <label>Email address</label>
                    </div>
                    <button onClick={setSignin}>Getting Started &gt;</button>
                </div>
            </form>
        
        
        </section>
    );
};

export default Signup;