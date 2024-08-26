import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';  // React Router의 Link 컴포넌트 사용
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FavoriteList_unplus } from '../components/Images';
import './FavoriteList.css';

function FavoriteList() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true);
            try {
                const user = auth.currentUser;
                if (user) {
                    const q = query(collection(db, 'favorites'), where('uid', '==', user.uid));
                    const querySnapshot = await getDocs(q);
                    const favList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setFavorites(favList);
                }
            } catch (error) {
                console.error('찜 목록을 불러오는 중 오류가 발생했습니다:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    const handleDeleteFavorite = async (favoriteId) => {
        const confirmed = window.confirm('정말 찜한 장소를 삭제하시겠습니까?');
        if (confirmed) {
            try {
                await deleteDoc(doc(db, 'favorites', favoriteId));
                setFavorites(favorites.filter(fav => fav.id !== favoriteId));
            } catch (error) {
                console.error('찜 삭제 오류:', error.message);
            }
        }
    };

    if (!auth.currentUser) {
        return <div>로그인이 필요합니다.</div>;
    }

    return (
        <div id="FavoriteList">
            <Header/>
            <div className="FavoriteList_main">
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
                                                    to={`/camp/${fav.contentId}`}  // Link를 통해 상세 페이지로 이동
                                                >
                                                    <img 
                                                        src={fav.firstImageUrl || '대체 이미지 URL'}
                                                        alt={fav.name}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="favorite_campList_bt">
                                                <div className="favorite_campList_bt_lt">
                                                    <h3>{fav.name}</h3>
                                                    <p>{fav.address}</p>    
                                                </div>
                                                <div className="favorite_campList_bt_rt">
                                                    <img 
                                                        src={FavoriteList_unplus} 
                                                        alt="FavoriteList_unplus" 
                                                        onClick={() => handleDeleteFavorite(fav.id)} 
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li>찜한 장소가 없습니다.</li>
                            )}
                        </ul>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default FavoriteList;
