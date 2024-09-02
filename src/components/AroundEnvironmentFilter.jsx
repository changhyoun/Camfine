import React, { useRef  } from 'react';
import './AroundEnvironmentFilter.css';

function AroundEnvironmentFilter({ showAroundEnvironment, selectedAroundEnvironments = [], handleAroundEnvironmentClick, handleAroundEnvironmentSelect, handleAroundEnvironmentConfirm }) {
    const AroundEnvironmentRef = useRef(null);

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
