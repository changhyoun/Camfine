import React, { useRef} from 'react';
import './CampingTypeFilter.css';

function CampingTypeFilter({ showCampingType, selectedCampingTypes, handleCampingTypeClick, handleCampingTypeSelect, handleCampingTypeConfirm }) {
    const campingTypeRef = useRef(null);

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
