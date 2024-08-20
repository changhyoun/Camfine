import React from 'react';

// CampingTypeFilter 내부로 campingTypeMapping 이동
const campingTypeMapping = {
    '오토캠핑': '야영장',
    '글램핑': '글램핑',
    '카라반': '카라반',
};

function CampingTypeFilter({ selectedCampingTypes, setSelectedCampingTypes, onConfirm }) {

    const handleCampingTypeSelect = (type) => {
        setSelectedCampingTypes(prevSelectedTypes => {
            const newSelectedTypes = prevSelectedTypes.includes(type) 
                ? prevSelectedTypes.filter(t => t !== type)
                : [...prevSelectedTypes, type];
            return newSelectedTypes;
        });
    };

    const handleConfirmClick = () => {
        const mappedTypes = selectedCampingTypes.map(type => campingTypeMapping[type]);
        onConfirm(mappedTypes);
    };

    return (
        <div className={`Camping_type show`}> {/* 필터 창은 항상 열림 */}
            <button className="close" onClick={handleConfirmClick}> {/* 닫기 버튼 클릭 시 필터 확정 */}
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
                    <button onClick={handleConfirmClick}>
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CampingTypeFilter;