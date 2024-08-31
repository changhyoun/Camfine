// src/favoriteService.js
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export const addFavorite = async (camp) => {
    const user = auth.currentUser;
    if (user) {
        // undefined 값을 확인하고 기본값 설정
        const favoriteData = {
            uid: user.uid,
            contentId: camp.contentId,
            facltNm: camp.facltNm ?? '시설명 없음', // 기본값 설정
            addr1: camp.addr1 ?? '주소 없음', // 기본값 설정
            firstImageUrl: camp.firstImageUrl ?? '', // 기본값 설정
            mapX: camp.mapX ?? 0, // 기본값 설정
            mapY: camp.mapY ?? 0, // 기본값 설정
            sbrsCl: camp.sbrsCl ?? '시설 정보 없음', // 기본값 설정
            doNm: camp.doNm ?? '도 정보 없음', // 기본값 설정
            sigunguNm: camp.sigunguNm ?? '시군구 정보 없음', // 기본값 설정
            region: camp.region ?? '지역 정보 없음' // 기본값 설정
        };

        const favoriteRef = doc(db, 'favorites', `${user.uid}_${camp.contentId}`);
        await setDoc(favoriteRef, favoriteData);
    } else {
        throw new Error('User not authenticated');
    }
};

export const removeFavorite = async (contentId) => {
    const user = auth.currentUser;
    if (user) {
        const favoriteRef = doc(db, 'favorites', `${user.uid}_${contentId}`);
        await deleteDoc(favoriteRef);
    } else {
        throw new Error('User not authenticated');
    }
};

export const isFavorite = async (contentId) => {
    const user = auth.currentUser;
    if (user) {
        const favoriteRef = doc(db, 'favorites', `${user.uid}_${contentId}`);
        const docSnapshot = await getDoc(favoriteRef);
        return docSnapshot.exists();
    } else {
        return false;
    }
};
