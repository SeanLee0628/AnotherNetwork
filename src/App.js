import React, { useState, useEffect } from 'react';
import './App.css';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailLink, sendSignInLinkToEmail, isSignInWithEmailLink, onAuthStateChanged } from "firebase/auth";
import { useAtom } from 'jotai';
import authAtom from './authAtom';
import emailAtom from './emailAtom';
import nameAtom from './nameAtom';
import { useNavigate } from 'react-router-dom';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkEZHcfg-i6xvEhvJ-It6wYkjYHtrRE9I",
  authDomain: "another-network-affb0.firebaseapp.com",
  projectId: "another-network-affb0",
  storageBucket: "another-network-affb0.appspot.com",
  messagingSenderId: "356777824867",
  appId: "1:356777824867:web:79113c3c7aba29d9d45e56",
  measurementId: "G-G0BE6JH5CW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const App = () => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        hours: '',
        id: '',
        position: '',
        positionNeed: '',
        email: ''
    });
    const [isLoggedIn, setIsLoggedIn] = useAtom(authAtom);
    const [userEmail, setUserEmail] = useAtom(emailAtom); 
    const [name, setName] = useAtom(nameAtom); 
    const navigate = useNavigate();

    useEffect(() => {
        const checkSignInLink = async () => {
            if (isSignInWithEmailLink(auth, window.location.href)) {
                const email = window.localStorage.getItem('emailForSignIn');
                if (!email) {
                    const enteredEmail = window.prompt('Please provide your email for confirmation');
                    if (enteredEmail) {
                        setUserEmail(enteredEmail);
                        await handleSignIn(enteredEmail, window.location.href);
                    }
                } else {
                    setUserEmail(email);
                    await handleSignIn(email, window.location.href);
                }
            }
        };

        checkSignInLink();

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.emailVerified) {
                setIsLoggedIn(true);
                setName(user.displayName || '');
            } else {
                setIsLoggedIn(false);
                setName('');
            }
        });

        return () => unsubscribe();
    }, [auth, setIsLoggedIn, setUserEmail, setName]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert('You need to log in before submitting the form.');
            return;
        }
        try {
            const response = await fetch('https://wdpek25gzj.execute-api.ap-northeast-2.amazonaws.com/AddApplicant', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Response:', data);
                setName(formData.name);
                localStorage.setItem("name", formData.name)
                navigate('/board');
            } else {
                console.error('Failed to submit data:', response.statusText);
                alert('Failed to submit data.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the data.');
        }
    };

    const handleSignUp = async (email) => {
        const actionCodeSettings = {
            url: window.location.href,
            handleCodeInApp: true,
        };
        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', email);
            alert('이메일 발송됨');
        } catch (error) {
            console.error('Error sending email verification:', error);
            alert('Error sending email verification: ' + error.message);
        }
    };

    const handleSignIn = async (email, emailLink) => {
        try {
            const result = await signInWithEmailLink(auth, email, emailLink);
            window.localStorage.removeItem('emailForSignIn');
            if (result.user.emailVerified) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    email: email || ''
                }));
                setIsLoggedIn(true);
                localStorage.setItem("email", email);
                alert('이메일 인증됨');
            } else {
                alert('Email verification failed. Please try again.');
            }
        } catch (error) {
            console.error('Error signing in:', error);
            alert('Error signing in: ' + error.message);
        }
    };

    const handleSignUpSubmit = (e) => {
        e.preventDefault();
        handleSignUp(formData.email);
    };

    return (
        <div className="container">
            <h1>{isLoggedIn ? "나의 정보 등록" : "Sign Up"}</h1>
            {isLoggedIn ? (
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="name">이름:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="company">소속:</label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hours">주간투자시간:</label>
                        <input
                            type="text"
                            id="hours"
                            name="hours"
                            value={formData.hours}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="id">아이디:</label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="position">포지션:</label>
                        <input
                            type="text"
                            id="position"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="positionNeed">필요한 포지션:</label>
                        <input
                            type="text"
                            id="positionNeed"
                            name="positionNeed"
                            value={formData.positionNeed}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            ) : (
                <form onSubmit={handleSignUpSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Sign Up</button>
                </form>
            )}
        </div>
    );
};

export default App;
