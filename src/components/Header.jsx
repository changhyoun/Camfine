import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { logoBlue } from './Images';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut, deleteUser } from 'firebase/auth';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';

function Header({ logo }) {
    const [nickname, setNickname] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/'); // /Main 경로로 이동
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setNickname(userDoc.data().nickname);
                }
            } else {
                setNickname('');
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setNickname('');
            setMenuVisible(false);
        } catch (error) {
            console.error('로그아웃 오류:', error.message);
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('계정을 정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
            try {
                const user = auth.currentUser;
                if (user) {
                    // Firestore에서 사용자 데이터 삭제
                    await deleteDoc(doc(db, 'users', user.uid));

                    // Firebase Authentication에서 사용자 삭제
                    await deleteUser(user);

                    setNickname('');
                    setMenuVisible(false);
                    alert('계정이 성공적으로 삭제되었습니다.');
                }
            } catch (error) {
                console.error('계정 삭제 오류:', error.message);
                alert('계정 삭제 중 오류가 발생했네요, 재 로그인 후 탈퇴를 진행해주세요!');
            }
        }
    };

    const displayNickname = nickname.length > 3 ? `${nickname.slice(0, 3)}...` : nickname;

    return (
        <div id="Header">
            <div className="Header_inner">
                <img src={logo || logoBlue} alt="logo" onClick={handleLogoClick} />
                {nickname ? (
                    <div className={`user-menu ${nickname ? 'logged-in' : ''}`} ref={menuRef}>
                        <div className='user-menu-main' onClick={() => setMenuVisible(!menuVisible)}>
                            {displayNickname}
                            <span className="material-symbols-rounded">
                            keyboard_arrow_down
                            </span>
                        </div>
                        {menuVisible && (
                            <ul className="dropdown-menu">
                                <li onClick={handleLogout}>로그아웃</li>
                                <li onClick={handleDeleteAccount}>계정 탈퇴하기</li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <Link to={"/login"}>
                        로그인 / 회원가입
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Header;
