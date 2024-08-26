import React, { useState } from 'react';
import './SignUp.css';
import { logoBlue, SignUp_pop } from '../components/Images';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function SignUp() {
    const [emailLocal, setEmailLocal] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false); 
    const [videoKey, setVideoKey] = useState(0); 

    const hideErrorMessage = (selector) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.display = 'none';
            element.style.opacity = '0';
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const showErrorMessage = (selector) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.display = 'block';
            element.style.opacity = '1';
        }
    };

    const handleEmailBlur = async () => {
        const fullEmail = `${emailLocal.trim()}@${emailDomain.trim()}`;
        
        if (!emailLocal || !emailDomain) {
            return;
        }
    
        try {
            const usersCollection = collection(db, 'users');
            const emailQuery = query(usersCollection, where('email', '==', fullEmail));
            const emailSnapshot = await getDocs(emailQuery);

            if (!emailSnapshot.empty) {
                setEmailError('중복된 이메일이예요❗');
                showErrorMessage('.email .same_mail');
            } else {
                setEmailError('');
            }
        } catch (error) {
            console.error('Firestore 이메일 확인 중 오류:', error.message);
            setEmailError('이메일 확인 중 오류가 발생했습니다.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        document.querySelectorAll('.no_input, .no_fit, .same_mail').forEach(el => {
            el.style.display = 'none';
            el.style.opacity = '0';
        });

        let valid = true;

        const fullEmail = `${emailLocal.trim()}@${emailDomain.trim()}`;
    
        try {
            const usersCollection = collection(db, 'users');
            const emailQuery = query(usersCollection, where('email', '==', fullEmail));
            const emailSnapshot = await getDocs(emailQuery);
    
            if (!emailSnapshot.empty) {
                setEmailError('중복된 이메일이예요❗');
                showErrorMessage('.email .same_mail');
                valid = false;
            }
        } catch (error) {
            console.error('Firestore 이메일 확인 중 오류:', error.message);
            setEmailError('이메일 확인 중 오류가 발생했습니다.');
            showErrorMessage('.email .same_mail');
            valid = false;
        }

        if (!emailLocal || !emailDomain) {
            showErrorMessage('.email .no_input');
            valid = false;
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(fullEmail)) {
                showErrorMessage('.email .no_fit');
                valid = false;
            }
        }

        if (emailError) {
            showErrorMessage('.email .same_mail');
            valid = false;
        }

        if (!nickname) {
            showErrorMessage('.nickname .no_input');
            valid = false;
        }

        if (!password) {
            showErrorMessage('.password .no_input');
            valid = false;
        }

        if (!confirmPassword) {
            showErrorMessage('.password_re .no_input');
            valid = false;
        }

        const passwordPattern = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (password && !passwordPattern.test(password)) {
            showErrorMessage('.password .no_fit');
            valid = false;
        }

        if (password !== confirmPassword) {
            showErrorMessage('.password_re .no_fit');
            valid = false;
        }

        if (!valid) return;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, fullEmail, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                nickname: nickname,
                email: fullEmail,
            });

            setVideoKey(prevKey => prevKey + 1);
            setSignupSuccess(true);
        } catch (error) {
            console.error('Error creating user:', error.message);
            alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    const handleReload = () => {
        window.location.reload();
    };

    const handleVideoLoaded = (e) => {
        const video = e.target;
        video.currentTime = video.duration / 2;
    };

    return (
        <div id="SignUp">
            {signupSuccess && (
                <div className={`signup_suc ${signupSuccess ? 'show' : ''}`}>
                    <div className="signup_suc_pop">
                        <video 
                            key={videoKey} 
                            src={SignUp_pop} 
                            autoPlay 
                            muted 
                            onLoadedMetadata={handleVideoLoaded}
                            onEnded={(e) => e.target.pause()} 
                        />
                        <h3><span>{nickname}님</span> 회원가입이 완료되었습니다.<br/>
                        <Link to={"/Login"}>로그인 페이지</Link>로 이동해보세요!</h3>
                    </div>
                    <span className="material-symbols-rounded" onClick={handleReload}>
                    close
                    </span>
                </div>
            )}
            <div className="SignUp_Warp">
                <img src={logoBlue} alt="logoBlue" />
                <p className='sign_m_p'>회원가입을 진행하셨나요? <Link to={"/Login"}>로그인 해보세요!</Link></p>
                <form onSubmit={handleSubmit}>
                    <div className="email">
                        <legend>이메일</legend>
                        <div className="email_box">
                            <input
                                type="text"
                                placeholder='이메일을 입력하세요.'
                                value={emailLocal}
                                className='SignUp_input'
                                onChange={(e) => {
                                    setEmailLocal(e.target.value);
                                    setEmailError(''); 
                                    hideErrorMessage('.email .no_input');
                                    hideErrorMessage('.email .no_fit');
                                }}
                                onBlur={handleEmailBlur} 
                            />
                            @
                            <input
                                type="text"
                                placeholder='도메인을 입력하세요.'
                                value={emailDomain}
                                className='SignUp_input'
                                onChange={(e) => {
                                    setEmailDomain(e.target.value);
                                    setEmailError(''); 
                                    hideErrorMessage('.email .no_input');
                                    hideErrorMessage('.email .no_fit');
                                }}
                                onBlur={handleEmailBlur} 
                            />
                        </div>
                        <p className='no_input'>이메일을 입력해주세요❗</p>
                        <p className='no_fit'>이메일 형식이 맞지 않아요❗</p>
                        {emailError && <p className='same_mail'>{emailError}</p>}
                    </div>
                    <div className="nickname">
                        <legend>닉네임</legend>
                        <div className="nickname_box">
                            <span className="material-symbols-rounded">
                                person
                            </span>
                            <input
                                className="box"
                                type="text"
                                placeholder='닉네임을 입력하세요.'
                                
                                value={nickname}
                                onChange={(e) => {
                                    setNickname(e.target.value);
                                    hideErrorMessage('.nickname .no_input');
                                }}
                            />
                        </div>
                        <p className='no_input'>닉네임을 입력해주세요❗</p>
                    </div>
                    <div className="password">
                        <legend>비밀번호</legend>
                        <div className="nickname_box">
                            <span className="material-symbols-rounded">
                                lock
                            </span>
                            <span
                                className="material-symbols-rounded"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? 'visibility_off' : 'visibility'}
                            </span>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                className='SignUp_input'
                                placeholder='비밀번호를 입력하세요.'
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    hideErrorMessage('.password .no_input');
                                    hideErrorMessage('.password .no_fit');
                                }}
                            />
                        </div>
                        <p>🔑 비밀번호 양식 : 8자리 이상 ㆍ 특수문자 포함 </p>
                        <p className='no_input'>비밀번호를 입력해주세요❗</p>
                        <p className='no_fit'>비밀번호 형식이 맞지 않아요❗</p>
                    </div>
                    <div className="password_re">
                        <legend>비밀번호 재확인</legend>
                        <div className="nickname_box">
                            <span className="material-symbols-rounded">
                                lock
                            </span>
                            <span
                                className="material-symbols-rounded"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {confirmPasswordVisible ? 'visibility_off' : 'visibility'}
                            </span>
                            <input
                                className='SignUp_input'
                                type={confirmPasswordVisible ? 'text' : 'password'}
                                placeholder='비밀번호를 다시 입력하세요.'
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    hideErrorMessage('.password_re .no_input');
                                    hideErrorMessage('.password_re .no_fit');
                                }}
                            />
                        </div>
                        <p className='no_input'>비밀번호를 재입력해주세요❗</p>
                        <p className='no_fit'>비밀번호가 맞지 않아요❗</p>
                    </div>
                    <button type='submit' className='signup_btn'>회원가입</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
