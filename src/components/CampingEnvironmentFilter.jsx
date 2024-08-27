import React, { useRef, useEffect } from 'react';
import './CampingEnvironmentFilter.css';

function CampingEnvironmentFilter({ showCampingEnvironment, selectedCampingEnvironments = [], handleCampingEnvironmentClick, handleCampingEnvironmentSelect, handleCampingEnvironmentConfirm }) {
    const resizeHandleRef = useRef(null);
    const campingEnvironmentRef = useRef(null);

    useEffect(() => {
        const handleMouseDown = (event) => {
            if (resizeHandleRef.current && campingEnvironmentRef.current) {
                const startY = event.clientY;
                const startHeight = campingEnvironmentRef.current.offsetHeight;

                const onMouseMove = (moveEvent) => {
                    const newHeight = startHeight + (startY - moveEvent.clientY);
                    campingEnvironmentRef.current.style.height = `${newHeight}px`;
                };

                const onMouseUp = () => {
                    window.removeEventListener('mousemove', onMouseMove);
                    window.removeEventListener('mouseup', onMouseUp);
                };

                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', onMouseUp);
            }
        };

        if (resizeHandleRef.current) {
            resizeHandleRef.current.addEventListener('mousedown', handleMouseDown);
        }

        return () => {
            if (resizeHandleRef.current) {
                resizeHandleRef.current.removeEventListener('mousedown', handleMouseDown);
            }
        };
    }, []);

    return (
        <div ref={campingEnvironmentRef} className={`Camping_Environment ${showCampingEnvironment ? 'show' : 'hidden'}`}>
            <div ref={resizeHandleRef} className="resize-handle"></div>
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
                        {['무선인터넷', '물놀이장', '놀이터', '운동시설', '트램폴린', '마트'].map(type => (
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
