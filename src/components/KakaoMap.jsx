import React, { useEffect } from 'react';

const KakaoMap = ({ address }) => {
    useEffect(() => {
        const loadKakaoMap = () => {
            const script = document.createElement('script');
            const apiKey = process.env.REACT_APP_KAKAO_API_KEY;
                console.log('Kakao API Key:', apiKey);
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services`;
            script.async = true;
            document.head.appendChild(script);

            script.onload = () => {
                console.log('Kakao maps script loaded.');
                if (window.kakao && window.kakao.maps) {
                    console.log('Kakao maps library is available.');
                    initializeMap();
                } else {
                    console.error('Kakao maps library is not available after script load.');
                }
            };

            script.onerror = () => {
                console.error('Kakao map script failed to load.');
            };
        };

        const initializeMap = () => {
            const kakao = window.kakao;
            if (!kakao || !kakao.maps || !kakao.maps.services) {
                console.error('Kakao maps or services is not available.');
                return;
            }

            console.log('Initializing map...');
            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch(address, function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                    const mapContainer = document.getElementById('map');
                    const mapOption = {
                        center: coords,
                        level: 3
                    };

                    const map = new kakao.maps.Map(mapContainer, mapOption);
                    new kakao.maps.Marker({
                        map: map,
                        position: coords
                    });

                    map.setCenter(coords);
                } else {
                    console.error('Geocode was not successful for the following reason: ' + status);
                }
            });
        };

        if (window.kakao && window.kakao.maps) {
            console.log('Kakao maps already loaded.');
            initializeMap();
        } else {
            console.log('Loading Kakao maps script...');
            loadKakaoMap();
        }
    }, [address]);

    return (
        <div id="map" style={{ width: '100%', height: '400px' }}>
            {/* 지도는 여기에 렌더링됩니다 */}
        </div>
    );
};

export default KakaoMap;