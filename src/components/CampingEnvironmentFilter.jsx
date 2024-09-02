import React, { useRef } from 'react';
import './CampingEnvironmentFilter.css';

function CampingEnvironmentFilter({ showCampingEnvironment, selectedCampingEnvironments = [], handleCampingEnvironmentClick, handleCampingEnvironmentSelect, handleCampingEnvironmentConfirm }) {
    const campingEnvironmentRef = useRef(null);

    return (
        <div ref={campingEnvironmentRef} className={`Camping_Environment ${showCampingEnvironment ? 'show' : 'hidden'}`}>
            <button className="close" onClick={handleCampingEnvironmentClick}>
                <span className="material-symbols-rounded">
                    remove
                </span>
            </button>
            <div className="Camping_Environment_warp">
                <div className="Camping_Environment_warp_t">
                    숙소 환경 - ( 복수선택 가능 )
                </div>
                <div className="Camping_Environment_warp_m">
                    <ul>
                        {['무선인터넷', '물놀이장', '놀이터', '운동시설', '트렘폴린', '마트'].map(type => (
                            <li
                                key={type}
                                className={selectedCampingEnvironments.includes(type) ? 'active' : ''}
                                onClick={() => handleCampingEnvironmentSelect(type)}
                            >
                                {type}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="Camping_Environment_warp_bt">
                    <button onClick={handleCampingEnvironmentConfirm}>
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CampingEnvironmentFilter;
