import React, { useRef, useEffect } from 'react';
import './AroundEnvironmentFilter.css';

function AroundEnvironmentFilter({ showAroundEnvironment, selectedAroundEnvironments = [], handleAroundEnvironmentClick, handleAroundEnvironmentSelect, handleAroundEnvironmentConfirm }) {
    const resizeHandleRef = useRef(null);
    const AroundEnvironmentRef = useRef(null);

    useEffect(() => {
        const handleMouseDown = (event) => {
            if (resizeHandleRef.current && AroundEnvironmentRef.current) {
                const startY = event.clientY;
                const startHeight = AroundEnvironmentRef.current.offsetHeight;

                const onMouseMove = (moveEvent) => {
                    const newHeight = startHeight + (startY - moveEvent.clientY);
                    AroundEnvironmentRef.current.style.height = `${newHeight}px`;
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
        <div ref={AroundEnvironmentRef} className={`Around_Environment ${showAroundEnvironment ? 'show' : 'hidden'}`}>
            <div ref={resizeHandleRef} className="resize-handle"></div>
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
