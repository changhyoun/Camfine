import React, { useEffect } from 'react';
import { CampDetails_main_map_coordinate } from './Images';

const KakaoMap = ({ mapX, mapY }) => {
  useEffect(() => {
    const loadKakaoMapScript = () => {
      return new Promise((resolve, reject) => {
        if (window.kakao && window.kakao.maps) {
          // Kakao 지도 API가 이미 로드된 경우
          resolve(window.kakao);
          return;
        }

        const script = document.createElement('script');
        const apiKey = process.env.REACT_APP_KAKAO_API_KEY;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
        script.async = true;
        script.onload = () => {
          if (window.kakao && window.kakao.maps) {
            resolve(window.kakao);
          } else {
            reject(new Error('Kakao maps script loaded but not available'));
          }
        };
        script.onerror = () => reject(new Error('Failed to load Kakao maps script'));
        document.head.appendChild(script);
      });
    };

    const initializeMap = (kakao) => {
      // DOM 요소가 있는지 확인
      const container = document.getElementById('map');
      if (!container) return;

      kakao.maps.load(() => {
        const options = {
          center: new kakao.maps.LatLng(mapY, mapX),
          level: 3,
        };

        const map = new kakao.maps.Map(container, options);

        const markerImage = new kakao.maps.MarkerImage(
          CampDetails_main_map_coordinate,
          new kakao.maps.Size(70, 70),
          { offset: new kakao.maps.Point(45, 75) }
        );

        const markerPosition = new kakao.maps.LatLng(mapY, mapX);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        marker.setMap(map);
      });
    };

    loadKakaoMapScript()
      .then(initializeMap)
      .catch((error) => {
        console.error('Failed to load Kakao Map script', error);
      });

    // 스크립트를 유지하되, 상태가 변경될 때마다 초기화
  }, [mapX, mapY]);

  return <div id="map" className='CampDetails_main_map'></div>;
};

export default KakaoMap;
