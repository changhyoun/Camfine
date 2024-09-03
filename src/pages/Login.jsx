// login page
import React, { useState } from 'react';
import './Login.css';
import { logoBlue, Login_pop } from '../components/Images';
import { auth } from '../firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { Link, Navigate, useNavigate } from 'react-router-dom';
import GoMain from '../components/GoMain';

function Login() {
    const [emailLocal, setEmailLocal] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false); // 비밀번호 가시성 상태 추가
    const [showError, setShowError] = useState(false);
    const [inputError, setInputError] = useState({ email: false, password: false });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let emailError = !emailLocal || !emailDomain;
        let passwordError = !password;

        setInputError({ email: emailError, password: passwordError });

        if (emailError || passwordError) {
            return;
        }

        const fullEmail = `${emailLocal.trim()}@${emailDomain.trim()}`;

        try {
            await signInWithEmailAndPassword(auth, fullEmail, password);
            navigate('/'); 
        } catch (error) {
      
            setShowError(true); 
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible); // 비밀번호 가시성 상태 변경
    };

    const goHome = () =>{
        navigate('/')
    }

    const reLoad = () =>{
        window.location.reload();
    }

    return (
        <div id="Login">
            {showError && (
                <div className="login_cancel show">
                    <div className="login_cancel_pop">
                        <video
                            src={Login_pop}
                            autoPlay
                            muted
                            onEnded={(e) => e.target.pause()}
                            playsInline
                        />
                        <h3>아이디 혹은 비밀번호가 틀립니다<br/>
                            <Link to={"#"} onClick={reLoad}>다시 입력해보세요</Link></h3>
                    </div>
                    <span className="material-symbols-rounded" onClick={() => setShowError(false)}>
                        close
                    </span>
                </div>
            )}
            <div className="Login_Warp">
                <GoMain/>
                <img src={logoBlue} alt="logoBlue" onClick={goHome} />
                <p className='log_m_p'>회원가입을 아직 못하셨나요?<br /><Link to={"/signUp"}> 회원가입을 해보세요!</Link></p>
                <form onSubmit={handleSubmit}>
                    <div className="email">
                        <legend>이메일</legend>
                        <div className="email_box">
                            <input
                                placeholder='이메일을 입력하세요.'
                                className='login_input'
                                value={emailLocal}
                                onChange={(e) => {
                                    setEmailLocal(e.target.value);
                                    setInputError((prevState) => ({ ...prevState, email: false }));
                                }}
                            />
                            @
                            <input
                                placeholder='도메인을 입력하세요.'
                                className='login_input'
                                value={emailDomain}
                                onChange={(e) => {
                                    setEmailDomain(e.target.value);
                                    setInputError((prevState) => ({ ...prevState, email: false }));
                                }}
                            />
                        </div>
                        {inputError.email && <p className='no_input'>이메일을 입력해주세요❗</p>}
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
                                style={{ cursor: 'pointer' }} // 클릭할 수 있도록 커서 변경
                            >
                                {passwordVisible ? 'visibility_off' : 'visibility'} {/* 비밀번호 가시성 아이콘 */}
                            </span>
                            <input
                                className='SignUp_input'
                                placeholder='비밀번호를 입력하세요.'
                                type={passwordVisible ? 'text' : 'password'} // 가시성에 따라 type 변경
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setInputError((prevState) => ({ ...prevState, password: false }));
                                }}
                            />
                        </div>
                        {inputError.password && <p className='no_input'>비밀번호를 입력해주세요❗</p>}
                    </div>
                    <button type='submit' className='login_btn'>로그인</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
