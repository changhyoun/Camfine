import React, { useRef, useEffect } from 'react';
import './CampingTypeFilter.css';

function CampingTypeFilter({
    showCampingType, 
    selectedCampingTypes, 
    handleCampingTypeClick, 
    handleCampingTypeSelect, 
    handleCampingTypeConfirm 
}) {
    const campingTypeRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            // 클릭된 영역이 campingTypeRef의 내부에 있는지 확인
            if (campingTypeRef.current && !campingTypeRef.current.contains(event.target)) {
                // CampingType 외부를 클릭했을 때 실행할 함수
                handleCampingTypeClick();
            }
        }

        if (showCampingType) {
            // 이벤트 리스너 추가 (외부 클릭 감지)
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            // 컴포넌트 언마운트 또는 showCampingType 변경 시 리스너 제거
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCampingType, handleCampingTypeClick]);

    return (
        <div ref={campingTypeRef} className={`Camping_type ${showCampingType ? 'show' : 'hidden'}`}>
            <button className="close" onClick={handleCampingTypeClick}>
                <span className="material-symbols-rounded">
                    remove
                </span>
            </button>
            <div className="Camping_type_warp">
                <div className="Camping_type_warp_t">
                    숙소 유형 - ( 복수선택 가능 )
                </div>
                <div className="Camping_type_warp_m">
                    <ul>
                        {['오토캠핑', '글램핑', '카라반'].map(type => (
                            <li
                                key={type}
                                className={selectedCampingTypes.includes(type) ? 'active' : ''}
                                onClick={() => handleCampingTypeSelect(type)}
                            >
                                {type}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="Camping_type_warp_bt">
                    <button onClick={handleCampingTypeConfirm}>
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CampingTypeFilter;
