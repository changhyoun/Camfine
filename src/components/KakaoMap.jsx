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

    // Kakao 지도 초기화
    const initializeMap = (kakao) => {
      kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new kakao.maps.LatLng(mapY, mapX),
          level: 3,
        };

        const map = new kakao.maps.Map(container, options);

        // 마커 이미지 설정
        const markerImage = new kakao.maps.MarkerImage(
          CampDetails_main_map_coordinate, // 이미지 경로
          new kakao.maps.Size(70, 70), // 마커 이미지 크기
          { offset: new kakao.maps.Point(45, 75) } // 마커의 좌표에 해당하는 이미지 위치
        );

        // 마커 설정
        const markerPosition = new kakao.maps.LatLng(mapY, mapX);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // 마커 이미지 설정
        });

        marker.setMap(map);
      });
    };

    // 스크립트 로드 및 지도 초기화
    loadKakaoMapScript()
      .then(initializeMap)
      .catch((error) => {
        console.error('Failed to load Kakao Map script', error);
      });

    return () => {
      // 컴포넌트가 언마운트될 때 스크립트를 제거하지 않고 유지
      // 이는 다른 페이지로 이동 후 다시 돌아올 때 지도가 재사용될 수 있도록 합니다.
    };
  }, [mapX, mapY]);

  return <div id="map" className='CampDetails_main_map'></div>;
};

export default KakaoMap;
