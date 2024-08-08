// CampDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const CampDetails = ({ campList }) => {
    const { id } = useParams();
    const camp = campList.find(c => c.contentId === id);

    if (!camp) {
        return <div>캠핑장 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <div>
            <h2>{camp.facltNm}</h2>
            <img src={camp.firstImageUrl} alt={camp.facltNm} />
            <p>{camp.addr1}</p>
            <p>{camp.intro}</p>
            {/* 추가 정보 표시 */}
        </div>
    );
};

export default CampDetails;