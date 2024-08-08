// Main.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './Main.css';
import { main_se1_icon1, main_se1_icon2, main_se1_icon3, main_se1_icon4, main_se1_slide_img1, main_se3_slide_arrow_lt, main_se3_slide_arrow_rt } from '../components/Images';
import Main_se1_box from '../components/Main_se1_box';

const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
const CAMPING_API_KEY = process.env.REACT_APP_CAMPING_API_KEY;
const defaultImageUrl = 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

function haversine(lat1, lon1, lat2, lon2) {
    function toRad(x) {
        return x * Math.PI / 180;
    }

    const R = 6371; // 지구 반지름 (킬로미터 단위)
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
}

function Main() {
    const [nearbyCampingSites, setNearbyCampingSites] = useState([]);
    const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
    const [noCampingSitesMessage, setNoCampingSitesMessage] = useState('');

    useEffect(() => {
        const loadKakaoMapScript = () => {
            const existingScript = document.getElementById('kakao-map-script');
            if (!existingScript) {
                const script = document.createElement('script');
                script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services`;
                script.id = 'kakao-map-script';
                script.async = true;
                script.onload = () => {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition((position) => {
                            const { latitude, longitude } = position.coords;
                            console.log(`현재 위치 - 위도: ${latitude}, 경도: ${longitude}`); // 현재 위치 콘솔 로그
                            setUserLocation({ lat: latitude, lng: longitude });
                        }, (error) => {
                            console.error('Error getting user location:', error);
                        });
                    } else {
                        console.error('Geolocation is not supported by this browser.');
                    }
                };
                document.head.appendChild(script);
            } else {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        const { latitude, longitude } = position.coords;
                        console.log(`현재 위치 - 위도: ${latitude}, 경도: ${longitude}`); // 현재 위치 콘솔 로그
                        setUserLocation({ lat: latitude, lng: longitude });
                    }, (error) => {
                        console.error('Error getting user location:', error);
                    });
                } else {
                    console.error('Geolocation is not supported by this browser.');
                }
            }
        };

        loadKakaoMapScript();
    }, []);

    useEffect(() => {
        // 첫 번째 Swiper 초기화
        new window.Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            spaceBetween: 50,
            slidesPerView: 1,
            loop: true,
            effect: 'cube',
            
         
        });
    }, []);

    useEffect(() => {
        // 두 번째 Swiper 초기화
        new window.Swiper('.swiper-container2', {
            navigation: {
                nextEl: '.swiper-button-next2',
                prevEl: '.swiper-button-prev2',
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            spaceBetween: 10,
            slidesPerView: 2,
            loop: true,
     
         
        });
    }, [nearbyCampingSites]);

    const fetchCampingSites = async (attempts = 3) => {
        try {
            const response = await axios.get('http://apis.data.go.kr/B551011/GoCamping/locationBasedList', {
                params: {
                    ServiceKey: CAMPING_API_KEY,
                    mapX: userLocation.lng, // 경도
                    mapY: userLocation.lat, // 위도
                    radius: 50000, // 반경 (미터 단위)
                    MobileOS: 'ETC',
                    MobileApp: 'AppTest',
                    _type: 'json'
                }
            });

            console.log('API 응답 데이터:', response.data);

            const items = response.data?.response?.body?.items?.item;
            if (items) {
                // items가 배열이 아닐 수 있는 경우 처리
                const itemsArray = Array.isArray(items) ? items : [items];

                // 거리 계산 및 정렬
                const itemsWithDistance = itemsArray.map(item => {
                    const distance = haversine(
                        userLocation.lat,
                        userLocation.lng,
                        parseFloat(item.mapY),
                        parseFloat(item.mapX)
                    );
                    console.log(`캠핑장: ${item.facltNm}, 거리: ${distance.toFixed(2)} km`);
                    return { ...item, distance };
                }).sort((a, b) => a.distance - b.distance);

                setNearbyCampingSites(itemsWithDistance);
                setNoCampingSitesMessage('');
            } else {
                console.error('No items found in the response');
                setNoCampingSitesMessage('50km 안에 캠핑장이 없습니다.');
            }
        } catch (error) {
            console.error('캠핑장 데이터를 가져오는 중 오류 발생:', error);
            if (attempts > 1) {
                console.log(`재시도 중... 남은 시도 횟수: ${attempts - 1}`);
                fetchCampingSites(attempts - 1);
            } else {
                setNoCampingSitesMessage('캠핑장 데이터를 가져오는 중 오류가 발생했습니다.');
            }
        }
    };

    useEffect(() => {
        if (userLocation.lat && userLocation.lng) {
            fetchCampingSites();
        }
    }, [userLocation]);

    const addLineBreaks = (text, length) => {
        if (text.length <= length) return text;
        const regex = new RegExp(`.{1,${length}}`, 'g');
        return text.match(regex).join('<br />');
    }; // 10자 넘으면 자동 br
    

    return (
        <div id="Main">
            <Header />
            <div className="main">
                <div className="main_warp">
                    <div className="main_se1">
                        <Link to="/list?type=오토캠핑">
                            <Main_se1_box Main_se1_box_ic={main_se1_icon1} Main_se1_box_tx={'오토캠핑'} />
                        </Link>
                        <Link to="/list?type=글램핑">
                            <Main_se1_box Main_se1_box_ic={main_se1_icon2} Main_se1_box_tx={'글램핑'} />
                        </Link>
                        <Link to="/list?type=카라반">
                            <Main_se1_box Main_se1_box_ic={main_se1_icon3} Main_se1_box_tx={'카라반'} />
                        </Link>
                        <Link to="/list?type=기타">
                            <Main_se1_box Main_se1_box_ic={main_se1_icon4} Main_se1_box_tx={'기타'} />
                        </Link>
                    </div>
                    <div className="main_se2">
                        <div className="swiper-container">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <a href='#'>
                                        <img src={main_se1_slide_img1} alt="slide" />
                                    </a>
                                </div>
                                <div className="swiper-slide">
                                    <a href='#'>
                                        <img src={main_se1_slide_img1} alt="slide" />
                                    </a>
                                </div>
                                <div className="swiper-slide">
                                    <a href='#'>
                                        <img src={main_se1_slide_img1} alt="slide" />
                                    </a>
                                </div>
                                <div className="swiper-slide">
                                    <a href='#'>
                                        <img src={main_se1_slide_img1} alt="slide" />
                                    </a>
                                </div>
                            </div>
                            <div className="swiper-pagination"></div>
                            <div className="swiper-button-next next">
                                <span className="material-symbols-rounded">
                                    swipe_right
                                </span>
                            </div>
                            <div className="swiper-button-prev prev">
                                <span className="material-symbols-rounded">
                                    swipe_left
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="main_se3">
                        <div className="main_se3_tx">
                            내 근처에 있는 ⛺
                        </div>
                        <div className="main_se3_box">
                            <div className="main_se3_box_inner">
                                {noCampingSitesMessage ? (
                                    <div className="no-camping-sites-message">
                                        {noCampingSitesMessage}
                                    </div>
                                ) : (
                                    <div className="swiper-container2">
                                        <div className="swiper-wrapper">
                                            {nearbyCampingSites.map((site, index) => (
                                                <div className="swiper-slide" key={index} >
                                                    <img src={site.firstImageUrl || defaultImageUrl} alt="campImg" />
                                                    <div className="near_camping-info">
                                                        <h3>{site.facltNm}</h3>
                                                        <p dangerouslySetInnerHTML={{ __html: addLineBreaks(site.addr1, 11) }} />
                                                        <p>{site.distance.toFixed(0)}km</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="main_se3_box_arrow_warp">
                                    <div className="swiper-button-prev2 prev2">
                                        <img src={main_se3_slide_arrow_lt} alt="previous" />
                                    </div>
                                    <div className="swiper-button-next2 next2">
                                        <img src={main_se3_slide_arrow_rt} alt="next" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
