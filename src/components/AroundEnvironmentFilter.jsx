import React, { useRef, useEffect } from 'react';
import './AroundEnvironmentFilter.css';

function AroundEnvironmentFilter({
    showAroundEnvironment, 
    selectedAroundEnvironments = [], 
    handleAroundEnvironmentClick, 
    handleAroundEnvironmentSelect, 
    handleAroundEnvironmentConfirm 
}) {
    const AroundEnvironmentRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            // 클릭된 영역이 AroundEnvironmentRef의 내부에 있는지 확인
            if (AroundEnvironmentRef.current && !AroundEnvironmentRef.current.contains(event.target)) {
                // AroundEnvironment 외부를 클릭했을 때 실행할 함수
                handleAroundEnvironmentClick();
            }
        }

        if (showAroundEnvironment) {
            // 이벤트 리스너 추가 (외부 클릭 감지)
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            // 컴포넌트 언마운트 또는 showAroundEnvironment 변경 시 리스너 제거
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showAroundEnvironment, handleAroundEnvironmentClick]);

    return (
        <div ref={AroundEnvironmentRef} className={`Around_Environment ${showAroundEnvironment ? 'show' : 'hidden'}`}>
            <button className="close" onClick={handleAroundEnvironmentClick}>
                <span className="material-symbols-rounded">
                    remove
                </span>
            </button>
            <div className="Around_Environment_warp">
                <div className="Around_Environment_warp_t">
                    숙소 환경 - ( 복수선택 가능 )
                </div>
                <div className="Around_Environment_warp_m">
                    <ul>
                        {['계곡', '바다', '산책로', '낚시', '산'].map(type => (
                            <li
                                key={type}
                                className={selectedAroundEnvironments.includes(type) ? 'active' : ''}
                                onClick={() => handleAroundEnvironmentSelect(type)}
                            >
                                {type}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="Around_Environment_warp_bt">
                    <button onClick={handleAroundEnvironmentConfirm}>
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AroundEnvironmentFilter;
