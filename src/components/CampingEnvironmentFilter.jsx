import React, { useRef, useEffect } from 'react';
import './CampingEnvironmentFilter.css';

function CampingEnvironmentFilter({
    showCampingEnvironment, 
    selectedCampingEnvironments = [], 
    handleCampingEnvironmentClick, 
    handleCampingEnvironmentSelect, 
    handleCampingEnvironmentConfirm 
}) {
    const campingEnvironmentRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            // 클릭된 영역이 campingEnvironmentRef의 내부에 있는지 확인
            if (campingEnvironmentRef.current && !campingEnvironmentRef.current.contains(event.target)) {
                // CampingEnvironment 외부를 클릭했을 때 실행할 함수
                handleCampingEnvironmentClick();
            }
        }

        if (showCampingEnvironment) {
            // 이벤트 리스너 추가 (외부 클릭 감지)
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            // 컴포넌트 언마운트 또는 showCampingEnvironment 변경 시 리스너 제거
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCampingEnvironment, handleCampingEnvironmentClick]);

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
