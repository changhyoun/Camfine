// src/favoriteService.js
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export const addFavorite = async (camp) => {
    const user = auth.currentUser;
    if (user) {
        const favoriteRef = doc(db, 'favorites', `${user.uid}_${camp.contentId}`);
        await setDoc(favoriteRef, {
            uid: user.uid,
            contentId: camp.contentId,
            facltNm: camp.facltNm,
            addr1: camp.addr1,
            firstImageUrl: camp.firstImageUrl,
            mapX: camp.mapX, // 추가
            mapY: camp.mapY, // 추가
            sbrsCl: camp.sbrsCl, // 추가
            doNm: camp.doNm, // 추가
            sigunguNm: camp.sigunguNm, // 추가
        });
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
