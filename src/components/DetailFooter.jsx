import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './DetailFooter.css';
import { go_browser_icon, CampDetails_list_plus, CampDetails_list_unplus } from './Images';
import { addFavorite, removeFavorite, isFavorite } from '../favoriteService';
import { auth } from '../firebase';

function DetailFooter({ onLikeStatusChange }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const { campList } = location.state || { campList: [] };
    const [camp, setCamp] = useState(null);
    const [isLiked, setIsLiked] = useState(false);

    const backBtn = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (campList && campList.length > 0) {
            const foundCamp = campList.find(c => String(c.contentId) === String(id));
            setCamp(foundCamp);
        }
    }, [campList, id]);

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (camp && auth.currentUser) {
                const favoriteStatus = await isFavorite(camp.contentId);
                console.log("Favorite status:", favoriteStatus);
                setIsLiked(favoriteStatus);
                onLikeStatusChange(favoriteStatus); // 좋아요 상태 변경 시 호출
            }
        };
        checkFavoriteStatus();
    }, [camp, auth.currentUser, onLikeStatusChange]);

    const handleLoveClick = async () => {
        if (camp && auth.currentUser) {
            if (isLiked) {
                const confirmCancel = window.confirm('좋아요를 취소하시겠어요?');
                if (confirmCancel) {
                    try {
                        await removeFavorite(camp.contentId);
                        setIsLiked(false);
                        onLikeStatusChange(false); // 좋아요 상태 변경 시 호출
                        alert('좋아요가 취소되었습니다.');
                    } catch (error) {
                        console.error('좋아요 취소 중 오류:', error);
                        alert('좋아요 취소 중 오류가 발생했습니다. 다시 시도해 주세요.');
                    }
                }
            } else {
                try {
                    await addFavorite(camp);
                    setIsLiked(true);
                    onLikeStatusChange(true); // 좋아요 상태 변경 시 호출
                    alert('찜한 장소에 추가되었습니다.');
                } catch (error) {
                    console.error('찜한 장소 추가 중 오류:', error);
                    alert('찜한 장소 추가 중 오류가 발생했습니다. 다시 시도해 주세요.');
                }
            }
        } else {
            alert('로그인이 필요합니다.');
            navigate('/login');
        }
    };

    return (
        <div id="DetailFooter">
            <div className="DetailFooter_inner">
                <button className="back" onClick={backBtn}>
                    <span className="material-symbols-rounded">
                        keyboard_backspace
                    </span>
                </button>
                <button className="reser">
                    {camp && camp.resveUrl ? (
                        <a href={camp.resveUrl} target="_blank" rel="noopener noreferrer">
                            <img src={go_browser_icon} alt="go_browser_icon" />
                        </a>
                    ) : (
                        <span className="no-resve-url">예약주소가 없네요!</span>
                    )}
                </button>
                <button 
                    className={`love ${isLiked ? 'liked' : ''}`}  
                    onClick={handleLoveClick}
                >
                    {isLiked ?
                        <img src={CampDetails_list_unplus} alt="CampDetails_list_unplus" /> :
                         <img src={CampDetails_list_plus} alt="CampDetails_list_plus" />
                    }
                </button>
            </div>
        </div>
    );
}

export default DetailFooter;
