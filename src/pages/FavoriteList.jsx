// like list page
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FavoriteList_unplus, logoWhite, FavoriteList_here_bubble, FavoriteList_here_man, FavoriteList_not, FavoriteList_delete_pop } from '../components/Images';
import './FavoriteList.css';

const defaultImageUrl = 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

function FavoriteList() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false); // 팝업 표시 여부
    const [selectedFavoriteId, setSelectedFavoriteId] = useState(null); // 삭제할 찜 ID

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe(); 
    }, []);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (user) {
                setLoading(true);
                try {
                    const q = query(collection(db, 'favorites'), where('uid', '==', user.uid));
                    const querySnapshot = await getDocs(q);
                    const favList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setFavorites(favList);
                } catch (error) {
        
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchFavorites();
    }, [user]);

    const handleDeleteFavorite = async () => {
        try {
            await deleteDoc(doc(db, 'favorites', selectedFavoriteId));
            setFavorites(favorites.filter(fav => fav.id !== selectedFavoriteId));
            setShowDeletePopup(false); // 팝업 닫기
        } catch (error) {

        }
    };

    const openDeletePopup = (favoriteId) => {
        setSelectedFavoriteId(favoriteId); // 선택된 찜 ID 설정
        setShowDeletePopup(true); // 팝업 열기
    };

    const closeDeletePopup = () => {
        setShowDeletePopup(false); // 팝업 닫기
        setSelectedFavoriteId(null); // 선택된 찜 ID 초기화
    };

    if (!user) {
        return <div>로그인이 필요합니다.</div>;
    }

    return (
        <div id="FavoriteList">
            <Header logo={logoWhite} />
            <div className={`FavoriteList_main ${showDeletePopup ? 'dimmed' : ''}`}> {/* 팝업이 열리면 dimmed 클래스 추가 */}
                <div className="FavoriteList_main_inner">
                    {loading ? (
                        <div>로딩 중...</div>
                    ) : (
                        <ul>
                            {favorites.length > 0 ? (
                                favorites.map((fav, index) => (
                                    <li className='favorite_campList' key={index}>
                                        <div className="favorite_campList_warp">
                                            <div className="favorite_campList_top">
                                                <Link 
                                                    to={`/camp/${fav.contentId}`}
                                                    state={{ camp: fav, campList: favorites }} 
                                                >
                                                    <img 
                                                        src={fav.firstImageUrl || defaultImageUrl}
                                                        alt={fav.name}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                    <img src={FavoriteList_here_man} alt="FavoriteList_here_man" />
                                                    <img src={FavoriteList_here_bubble} alt="FavoriteList_here_bubble" />
                                                    <p>이미지를<br/>클릭해보세요!</p>
                                                </Link>
                                            </div>
                                            <div className="favorite_campList_bt">
                                                <div className="favorite_campList_bt_lt">
                                                    <h3>{fav.facltNm}</h3>
                                                    <p>{fav.addr1}</p>    
                                                </div>
                                                <div className="favorite_campList_bt_rt">
                                                    <img 
                                                        src={FavoriteList_unplus} 
                                                        alt="FavoriteList_unplus" 
                                                        onClick={() => openDeletePopup(fav.id)} // 팝업 열기 함수 호출
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="not_favorite">
                                    <img src={FavoriteList_not} alt="FavoriteList_not" />
                                    <p>찜한 장소가 없어요!</p>
                                </li>
                            )}
                        </ul>
                    )}
                </div>
            </div>
            {showDeletePopup && ( // 팝업 표시
                <div className="fav_delete_pop">
                    <div className="fav_delete_pop_warp">
                        <h3>찜을 삭제하시겠어요?</h3>
                        <img src={FavoriteList_delete_pop} alt="FavoriteList_delete_pop" />
                        <div className="delete_btn_warp">
                            <button onClick={handleDeleteFavorite}>삭제</button>
                            <button onClick={closeDeletePopup}>취소</button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default FavoriteList;
