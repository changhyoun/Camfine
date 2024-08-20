import React, { useState, useEffect } from 'react';
import './Footer.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

function Footer() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

    const handleProtectedLinkClick = (e, path) => {
        if (!isLoggedIn) {
            e.preventDefault(); // 링크의 기본 동작을 막음
            if (window.confirm('로그인이 필요한 서비스입니다. 로그인 창으로 이동됩니다.')) {
                navigate('/login');
            }
        } else {
            navigate(path);
        }
    };

    return (
        <div id="Footer">
            <div className="Footer_inner">
                <div className="Footer_box">
                    <Link to={'/'}>
                        <span className="material-symbols-rounded">
                            home
                        </span>
                        <h4>홈</h4>
                    </Link>
                </div>
                
                <div className="Footer_box">
                    <Link to={'/searchList'}>
                        <span className="material-symbols-rounded">
                            search
                        </span>
                        <h4>검색</h4>
                    </Link>
                </div>
                
                <div className="Footer_box">
                    {/* 찜한 장소 클릭 시 로그인이 필요한지 확인 */}
                    <a href="/das" onClick={(e) => handleProtectedLinkClick(e, '/das')}>
                        <span className="material-symbols-rounded">
                            favorite
                        </span>
                        <h4>찜한 장소</h4>
                    </a>
                </div>
                
                <div className="Footer_box">
                    {/* 내 정보 클릭 시 로그인이 필요한지 확인 */}
                    <a href="/myInfo" onClick={(e) => handleProtectedLinkClick(e, '/myInfo')}>
                        <span className="material-symbols-rounded">
                            person
                        </span>
                        <h4>내 정보</h4>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;
