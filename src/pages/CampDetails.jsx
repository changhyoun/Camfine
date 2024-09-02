// list detail page
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import { weather_1, weather_2, weather_3, weather_4, weather_5, weather_6, weather_7, weather_not, facebookLogo, xLogo, kakaoLogo, logoWhite, location_icon, CampDetails_main_pet_pass_lt, CampDetails_main_pet_pass_rt, CampDetails_main_pet_not_lt, CampDetails_main_pet_not_rt, SearchList_main_statistics_lt_back, CampDetails_main_share, CampDetails_main_like1, CampDetails_main_like2 } from '../components/Images'; 
import './CampDetails.css';
import DetailFooter from '../components/DetailFooter';
import { faMagnifyingGlassLocation, faCampground, faUpRightAndDownLeftFromCenter, faInfo, faBolt, faWifi, faFire, faShower, faGamepad, faBasketballBall, faDumbbell, faWater, faPersonWalking, faStreetView, faStore, faShareFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';
import KakaoMap from '../components/KakaoMap';

const defaultImageUrl = 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const errorImageUrl = 'https://images.unsplash.com/photo-1652077859695-de2851a95620?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const getBackgroundImage = (weatherCode) => {
    switch (weatherCode.slice(0, 2)) { 
        case '09': 
        case '10': 
            return 'url(https://images.unsplash.com/photo-1428592953211-077101b2021b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
        case '01': 
            return 'url(https://images.unsplash.com/photo-1617142137869-325955e2d3cb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
        case '02': 
            return 'url(https://images.unsplash.com/photo-1608590046616-c6f083447267?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
        case '03': 
        case '04': 
            return 'url(https://images.unsplash.com/photo-1608590046616-c6f083447267?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';
        case '11': 
            return 'url(https://path/to/thunderstorm.jpg)';
        case '13': 
            return 'url(https://path/to/snow.jpg)';
        case '50': 
            return 'url(https://path/to/mist.jpg)';
        default:
            return `url(${errorImageUrl})`; 
    }
};

const getWeatherIcon = (weatherCode) => {
    switch (weatherCode.slice(0, 2)) {
        case '01': 
            return weather_1;
        case '02': 
            return weather_2;
        case '03': 
        case '04': 
            return weather_3;
        case '09': 
        case '10': 
            return weather_4;
        case '11': 
            return weather_5;
        case '13': 
            return weather_6;
        case '50': 
            return weather_7;
        default:
            return weather_not;
    }
};

const getShotWeatherIcon = (weatherCode) => {
    switch (weatherCode.slice(0, 2)) {
        case '01': 
            return 'wb_sunny';
        case '02': 
            return 'cloud';
        case '03': 
        case '04': 
            return 'cloud_queue';
        case '09': 
        case '10': 
            return 'umbrella';
        case '11': 
            return 'thunderstorm';
        case '13': 
            return 'ac_unit';
        case '50': 
            return 'waves';
        default:
            return 'help_outline';
    }
};

const CampDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const CampDetails_main = useRef(null);
    const [camp, setCamp] = useState(null);
    const [weather, setWeather] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState('');
    const [weatherIcon, setWeatherIcon] = useState('');
    const [shotWeatherIcon, setShotWeatherIcon] = useState('');
    const [formattedDate, setFormattedDate] = useState('');
    const [year, setYear] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
    const swiperRef = useRef(null);
    const [isActive2, setIsActive2] = useState(false);
    const [nearbyCamps, setNearbyCamps] = useState([]);
    const likedMessageRef = useRef(null); // liked-message 요소 참조
    const [isLiked, setIsLiked] = useState(false); // 좋아요 상태 추가
    const [isClosed, setIsClosed] = useState(false); // 좋아요 메시지 닫힘 상태 초기화
    

    // DetailFooter로부터 좋아요 상태 업데이트를 받는 함수
    const handleLikeStatusChange = (likedStatus) => {
        setIsLiked(likedStatus);
        if (likedStatus) {
            setIsClosed(false); // 좋아요가 true일 때 메시지를 열어둠
        }
    };

    // 좋아요 메시지 닫기 함수
    const handleCloseLikedMessage = () => {
        if (likedMessageRef.current) {
          likedMessageRef.current.classList.add('closed'); // 'closed' 클래스 추가
        }
      };

      const handleTransitionEnd = () => {
        if (likedMessageRef.current.classList.contains('closed')) {
            likedMessageRef.current.style.display = 'none'; // 애니메이션 끝난 후 display: none
        }
    };

    // 캠핑장 정보 로드
    const fetchCampDetails = async (campId) => {
        try {
            const response = await axios.get(`https://api-endpoint.com/${campId}`, {
                params: {
                    MobileOS: "ETC",
                    MobileApp: "AppTest",
                    serviceKey: process.env.REACT_APP_CAMPING_API_KEY,
                    _type: "json",
                    contentId: campId,
                }
            });

            if (response.data && response.data.response?.body?.items?.item.length > 0) {
                setCamp(response.data.response.body.items.item[0]);
            } else {
                setCamp(null);
            }
        } catch (error) {
            console.error('캠핑장 데이터를 가져오는 중 오류가 발생했습니다.', error);
            setCamp(null);
        }
    };

    useEffect(() => {
        console.log("Received camp from state:", location.state?.camp);
        console.log("Received camp from state:", location.state?.camp);
        console.log("Received campList from state:", location.state?.campList);
        if (location.state?.camp) {
            setCamp(location.state.camp);
        } else if (location.state?.campList) {
            const foundCamp = location.state.campList.find(c => String(c.contentId) === String(id));
            if (foundCamp) {
                setCamp(foundCamp);
            } else {
                fetchCampDetails(id);  // state에 없을 경우 API 호출
            }
        } else {
            fetchCampDetails(id);  // URL 직접 접근 시 API 호출
        }
    }, [id, location.state]);

    useEffect(() => {
        if (CampDetails_main.current) {
            CampDetails_main.current.scrollTo(0, 0);  // 페이지 상단으로 스크롤
        }
    }, [id]);

    // 날씨 데이터 로드
    useEffect(() => {
        const fetchWeatherData = async () => {
            if (camp) {
                try {
                    const cityName = camp.sigunguNm;
                    const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
                    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)},KR&appid=${apiKey}&units=metric&lang=kr`;

                    const response = await axios.get(url);
                    console.log("Weather data response:", response.data);
                    const weatherData = response.data.weather[0].description;
                    const temperatureData = Math.round(response.data.main.temp);
                    const humidityData = response.data.main.humidity;
                    const weatherIconCode = response.data.weather[0].icon;

                    setWeather(weatherData);
                    setTemperature(temperatureData);
                    setHumidity(humidityData);
                    setBackgroundImage(getBackgroundImage(weatherIconCode));
                    setWeatherIcon(getWeatherIcon(weatherIconCode));
                    setShotWeatherIcon(getShotWeatherIcon(weatherIconCode));

                    const date = new Date();
                    setFormattedDate(`${String(date.getMonth() + 1).padStart(2, '0')}월 - ${String(date.getDate()).padStart(2, '0')}일`);
                    setYear(`${date.getFullYear()}년`);
                    setDayOfWeek(`${['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][date.getDay()]}`);
                } catch (error) {
                    console.error('날씨 데이터를 가져오는 중 오류가 발생했습니다.', error);
                    setWeather(null);
                    setTemperature("정보가\n없어요 😅");
                    setHumidity("");
                    setBackgroundImage(`url(${errorImageUrl})`);
                    setWeatherIcon(weather_not);
                    setShotWeatherIcon('help_outline');
                }
            }
        };

        const fetchNearbyCamps = async () => {
            if (camp) {
                const Mx = parseFloat(camp.mapX);
                const My = parseFloat(camp.mapY);
                const radius = "20000"; // 반경 20km
                
                try {
                    const response = await axios.get('https://apis.data.go.kr/B551011/GoCamping/locationBasedList', {
                        params: {
                            numOfRows: 10,
                            pageNo: 1,
                            MobileOS: "ETC",
                            MobileApp: "AppTest",
                            serviceKey: process.env.REACT_APP_CAMPING_API_KEY,
                            mapX: Mx,
                            mapY: My,
                            radius: radius,
                            _type: "json"
                        }
                    });

                    if (response.data?.response?.body?.items?.item) {
                        const nearbyCamps = response.data.response.body.items.item;
                        const sortedCamps = await Promise.all(
                            nearbyCamps.map(async (nearCamp) => {
                                const distance = await calculateDistanceKakaoNavi(My, Mx, parseFloat(nearCamp.mapY), parseFloat(nearCamp.mapX));
                                return {
                                    ...nearCamp,
                                    distance,
                                };
                            })
                        );
                        sortedCamps.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
                        setNearbyCamps(sortedCamps.slice(1, 3)); // 가장 가까운 2개 선택
                    } else {
                        console.error('주변 캠핑장 데이터를 찾을 수 없습니다.');
                        setNearbyCamps([]);
                    }
                } catch (error) {
                    console.error('주변 캠핑장 데이터를 가져오는 중 오류가 발생했습니다.', error);
                    setNearbyCamps([]);
                }
            }
        };
        console.log("Camp location:", camp?.mapX, camp?.mapY);
        if (camp) {
            fetchWeatherData();
            fetchNearbyCamps();
        }
    }, [camp]);

    // Kakao Navi API를 사용하여 두 지점 간의 도로 거리를 계산하는 함수
    const calculateDistanceKakaoNavi = async (lat1, lon1, lat2, lon2) => {
        const url = `https://apis-navi.kakaomobility.com/v1/directions?origin=${lon1},${lat1}&destination=${lon2},${lat2}`;
        const headers = {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO__Rest_API_KEY}`,
        };
    
        try {
            const response = await axios.get(url, { headers });
            if (response.data.routes && response.data.routes.length > 0) {
                const distance = response.data.routes[0]?.summary?.distance / 1000; // meter to km
                return distance;
            } else {
                console.error('No routes found in the response');
                return null;
            }
        } catch (error) {
            console.error('카카오 네비 경로를 가져오는 중 오류가 발생했습니다.', error);
            return null;
        }
    };

    // 카카오 네비로 길찾기를 실행하는 함수
    const handleNaviClick = (destinationLat, destinationLon, destinationAddr) => {
        if (!camp || !camp.mapY || !camp.mapX) {
            console.error('캠핑장 좌표가 없습니다.');
            return;
        }
    
        const startAddress = camp.addr1;
    
        const url = `https://map.kakao.com/?sName=${encodeURIComponent(startAddress)}&eName=${encodeURIComponent(destinationAddr)}&ex=${destinationLon}&ey=${destinationLat}&type=CAR`;
        
        window.open(url, '_blank');
    };

    const handleSlideClick = (event) => {
        const { clientX, currentTarget } = event;
        const { left, width } = currentTarget.getBoundingClientRect();
        const clickPosition = clientX - left;

        if (clickPosition < width / 2) {
            swiperRef.current.swiper.slidePrev();
        } else {
            swiperRef.current.swiper.slideNext();
        }
    };

    const toggleActiveState = () => {
        setIsActive(!isActive);
    };

    const toggleActiveState2 = () => {
        setIsActive2(!isActive2);
    };

    const toggleSharePopup = () => {
        setIsSharePopupOpen(!isSharePopupOpen);
    };

    const copyToClipboard = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('링크가 클립보드에 복사되었습니다.');
            toggleSharePopup();
        });
    };

    const shareToTwitter = () => {
        const url = window.location.href;
        const text = encodeURIComponent(`캠핑 정보 조회 campine에서 : ${camp ? camp.facltNm : ''} 확인해보세요!`);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    };

    const shareToKakao = () => {
        if (window.Kakao && window.Kakao.Link) {
            window.Kakao.Link.sendDefault({
                objectType: 'feed',
                content: {
                    title: camp ? camp.facltNm : 'Camping Spot',
                    description: `Check out this camping spot: ${camp ? camp.facltNm : ''}`,
                    imageUrl: camp && camp.firstImageUrl ? camp.firstImageUrl : defaultImageUrl,
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                    },
                },
                buttons: [
                    {
                        title: 'Visit',
                        link: {
                            mobileWebUrl: window.location.href,
                            webUrl: window.location.href,
                        },
                    },
                ],
            });
        } else {
            console.error('카카오톡 SDK가 초기화되지 않았습니다.');
        }
    };

    const shareToFacebook = () => {
        const url = window.location.href;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    };

    const handleCopyFacilityName = () => {
        const facilityName = camp.addr1;
        navigator.clipboard.writeText(facilityName).then(() => {
            alert('캠핑장 주소가 복사되었습니다.');
        }).catch((error) => {
            console.error('복사 실패:', error);
        });
    };

    const groupFacilities = (facilities, groupSize) => {
        const grouped = [];
        for (let i = 0; i < facilities.length; i += groupSize) {
            grouped.push(facilities.slice(i, i + groupSize));
        }
        return grouped;
    };

    const groupedFacilities = camp?.sbrsCl ? groupFacilities(camp.sbrsCl.split(','), 6) : [];

    const nearCampingClick = (newId) => {
        navigate(`/camp/${newId}`, { state: { campList: [camp, ...nearbyCamps] } });
    };

    if (!camp) {
        return <div>캠핑장 정보를 찾을 수 없습니다.</div>;
    }

    const imageUrl = camp.firstImageUrl || defaultImageUrl;
    const hasImage = Boolean(camp.firstImageUrl);
    const region = `${camp.doNm} ${camp.sigunguNm}`;

    const temperatureStyle = temperature === "정보가\n없어요 😅" ? { fontSize: '0.9rem', whiteSpace: 'pre-wrap', textAlign: 'center' } : {}; 
    const humidityStyle = humidity === "" ? { display: 'none' } : {}; 
    

    const renderFacilityIcon = (facility) => {
        switch(facility.trim()) {
            case '전기':
                return <FontAwesomeIcon icon={faBolt} />;
            case '무선인터넷':
                return <FontAwesomeIcon icon={faWifi} />;
            case '장작판매':
                return <FontAwesomeIcon icon={faFire} />;
            case '온수':
                return <FontAwesomeIcon icon={faShower} />;
            case '트렘폴린':
                return <FontAwesomeIcon icon={faGamepad} />;
            case '놀이터':
                return <FontAwesomeIcon icon={faBasketballBall} />;
            case '운동시설':
                return <FontAwesomeIcon icon={faDumbbell} />;
            case '물놀이장':
                return <FontAwesomeIcon icon={faWater} />;
            case '산책로':
                return <FontAwesomeIcon icon={faPersonWalking} />;
            case '운동장':
                return <FontAwesomeIcon icon={faStreetView} />;
            case '마트.편의점':
            case '편의점':
            case '마트':
                return <FontAwesomeIcon icon={faStore} />;
            default:
                return <FontAwesomeIcon icon={faInfo} />;
        }
    };

    return (
        <div id='CampDetails'>
            <Header logo={logoWhite} />
            <div className={`CampDetails_main ${isSharePopupOpen ? 'popup_on' : ''}`}  ref={CampDetails_main}>
                <div className="CampDetails_main_warp">
                    <div className="CampDetails_main_img_box">
                        <div className={`CampDetails_main_img ${!hasImage ? 'no-image' : ''}`}>
                            {!hasImage && <p>임시 이미지입니다.</p>}
                            <img src={imageUrl} alt={camp.facltNm} />
                        </div>
                    </div>

                    
                    <div className="CampDetails_main_warp_inbox">
                    {isLiked && (
                       <div
                         className={`liked-message`}
                         ref={likedMessageRef}
                         onTransitionEnd={handleTransitionEnd} 
                       >
                         <div className="liked-message_inner">
                           <img
                             src={CampDetails_main_like1}
                             alt="CampDetails_main_like1"
                           />
                           <p>좋아요한 캠핑장이네요!</p>
                           <img
                             src={CampDetails_main_like2}
                             alt="CampDetails_main_like2"
                           />
                         </div>
                         <span
                           className="material-symbols-rounded cl"
                           onClick={handleCloseLikedMessage} // 클릭 시 클래스 추가
                         >
                           close
                         </span>
                       </div>
                     )}
                        <div className="CampDetails_main_info">
                            <div className="CampDetails_main_info_warp">
                                <h3>{camp.facltNm}</h3>
                                <div className="CampDetails_main_info_box" onClick={handleCopyFacilityName}>
                                    <div className="CampDetails_main_info_box_lt">
                                        <img src={location_icon} alt="location_icon" />
                                    </div>
                                    <p>{camp.addr1}</p>
                                    <div 
                                        className="CampDetails_main_info_box_rt"
                                    >
                                    <span className="material-symbols-rounded"  onClick={handleCloseLikedMessage}>
                                        content_copy
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div 
                            className={`CampDetails_main_weather ${isActive ? 'active' : ''}`} 
                            style={{ backgroundImage }}
                            onClick={toggleActiveState}
                        >
                            <span className="material-symbols-rounded" onClick={toggleActiveState}>
                                {isActive ? 'add' : 'remove'}
                            </span>
                            <div className="CampDetails_main_weather_shot">
                                <span className="material-symbols-rounded weather-icon">
                                    {shotWeatherIcon}
                                </span>
                                <h4>{region && region !== 'undefined undefined' ? region : '지역 확인이 안되요!'}</h4>
                                <p style={temperatureStyle}>
                                {temperature !== "정보가\n없어요 😅" ? `${temperature}℃` : temperature}</p>
                            </div>
                            <div className="CampDetails_main_weather_inner" style={{ display: isActive}}>
                                <div className="CampDetails_main_weather_lt">
                                    <h2 className="formatted-date">{formattedDate}</h2>
                                    <p className="formatted-year-day">{year} | {dayOfWeek}</p>
                                </div>
                                <div className="CampDetails_main_weather_rt">
                                    <div className="CampDetails_main_weather_rt_box">
                                        <div className="SCampDetails_main_weather_rt_box_top">
                                            {region && region !== 'undefined undefined' ? region : '지역 확인이 안되요!'}
                                        </div>
                                        <div className="CampDetails_main_weather_rt_box_bottom">
                                            <div className="CampDetails_main_weather_rt_box_bottom_lt">
                                                <h3 style={temperatureStyle}>
                                                    {temperature !== "정보가\n없어요 😅" ? `${temperature}℃` : temperature}
                                                </h3>

                                                <p style={humidityStyle}>습도 : {humidity}%</p>
                                                <p>{weather}</p>
                                            </div>
                                            <div className="CampDetails_main_weather_rt_box_bottom_rt">
                                                <img src={weatherIcon} alt="Weather Icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                        <div className="CampDetails_main_pet">
                            {camp.animalCmgCl === "가능" ? (
                                <div className="CampDetails_main_pet_warp">
                                    <div className="CampDetails_main_pet_lt">
                                        <img src={CampDetails_main_pet_pass_lt} alt="애견 동반 가능" />
                                    </div>
                                    <p>애견 동반이 가능하네요!</p>
                                    <div className="CampDetails_main_pet_rt">
                                        <img src={CampDetails_main_pet_pass_rt} alt="애견 동반 가능" />
                                    </div>
                                </div>
                            ) : (
                                <div className="CampDetails_main_not_pet_warp">
                                    <div className="CampDetails_main_pet_lt">
                                        <img src={CampDetails_main_pet_not_lt} alt="애견 동반 불가능" />
                                    </div>
                                    <p>애견 동반이 불가능하네요!</p>
                                    <div className="CampDetails_main_pet_rt">
                                        <img src={CampDetails_main_pet_not_rt} alt="애견 동반 불가능" />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div
                            className={`CampDetails_main_facilities ${isActive2 ? 'active' : ''}`}
                        >
                            <div className="CampDetails_main_facilities_top">
                                <span className="material-symbols-rounded" onClick={toggleActiveState2}>
                                    {isActive2 ? 'remove' : 'add'}
                                </span>
                                <div className="inner">
                                    <p onClick={toggleActiveState2}>시설 및 환경</p>
                                </div>
                            </div>
                            <div className="CampDetails_main_facilities_bottom" onClick={handleSlideClick}>
                                <img src={SearchList_main_statistics_lt_back} alt="Back" />
                                <Swiper
                                    ref={swiperRef}
                                    spaceBetween={30}
                                    slidesPerView={1}
                                    navigation={groupedFacilities.length > 1 && {
                                        nextEl: groupedFacilities.length > 1 ? '.swiper-button-next4' : null,
                                        prevEl: groupedFacilities.length > 1 ? '.swiper-button-prev4' : null,
                                    }}
                                    modules={[Navigation]}
                                >
                                    {groupedFacilities.length > 0 ? (
                                        groupedFacilities.map((facilityGroup, index) => (
                                            <SwiperSlide key={index} className="facility-group">
                                                {facilityGroup.length > 0 ? (
                                                    <div className="facility-group-inner">
                                                        {facilityGroup.map((facility, subIndex) => (
                                                            <div key={subIndex} className="facility">
                                                                <div className="icon_box">
                                                                    {renderFacilityIcon(facility)}
                                                                </div>
                                                                <p>{facility.trim()}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="no-facility-group-inner">
                                                        <p>요소가 없습니다.</p>
                                                    </div>
                                                )}
                                            </SwiperSlide>
                                        ))
                                    ) : (
                                        <SwiperSlide className="facility-group">
                                            <div className="no-facility-group-inner">
                                                <p>표시되는 시설,환경이 없는거 같네요.</p>
                                            </div>
                                        </SwiperSlide>
                                    )}
                                </Swiper>
                                {groupedFacilities.length > 1 && (
                                    <>
                                        <div className="swiper-button-prev swiper-button-prev4">
                                            <span className="material-symbols-rounded">
                                                swipe_left
                                            </span>
                                        </div>
                                        <div className="swiper-button-next swiper-button-next4">
                                            <span className="material-symbols-rounded">
                                                swipe_right
                                            </span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        {/* 카카오 맵 캠핑장 경도, 위도 표시 */}
                        <KakaoMap mapX={camp.mapX} mapY={camp.mapY} />
                        <div className="CampDetails_main_near">
                            <div className="CampDetails_main_near_top">
                                주변에 있는 캠핑장 ⛺ <span>ㆍ최대 2개까지 표시됩니다.</span>
                            </div>
                            <div className="CampDetails_main_near_bottom">
                                {nearbyCamps.length > 0 ? (
                                    nearbyCamps.map((nearCamp, index) => (
                                        <div key={index} className="CampDetails_main_near_bottom_warp">
                                            <div className="camp_list">
                                                <div className="camp_list_img">
                                                    <p>{`${nearCamp.distance?.toFixed(0)} km`}</p>
                                                    <img src={nearCamp.firstImageUrl || defaultImageUrl} alt={nearCamp.facltNm} onClick={() => nearCampingClick(nearCamp.contentId)} />
                                                </div>
                                                <div className="camp_list_info">
                                                    <p>{nearCamp.facltNm}</p>
                                                    <span>{nearCamp.addr1}</span>
                                                    <button onClick={() => handleNaviClick(nearCamp.mapY, nearCamp.mapX, nearCamp.addr1)}>
                                                        길찾기
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>주변에 캠핑장이 없습니다.</p>
                                )}
                            </div>
                        </div>
                        <div className="CampDetails_main_shareCall" onClick={toggleSharePopup}>
                            <p>캠핑장을 공유해보세요!</p>
                            <FontAwesomeIcon icon={faShareFromSquare} />
                            <img src={CampDetails_main_share} alt="Share" />     
                        </div>
                    </div>
                </div>
            </div>
            <DetailFooter onLikeStatusChange={handleLikeStatusChange} />
            {isSharePopupOpen && (
                <div className="share-popup popup_open">
                    <div className="share-popup-inner">
                        <div className="share-popup-t">
                            <h3>Share</h3>
                            <button className="close-popup" onClick={toggleSharePopup}>
                                <span className="material-symbols-rounded">
                                    close
                                </span>
                            </button>
                        </div>
                        <div className="share-popup-mi">
                            <button onClick={shareToKakao}>
                                <img src={kakaoLogo} alt="카카오톡" />
                                <p>카카오톡</p>
                            </button>
                            <button onClick={shareToTwitter}>
                                <img src={xLogo} alt="X" />
                                <p>X</p>
                            </button>
                            <button onClick={shareToFacebook}>
                                <img src={facebookLogo} alt="페이스북" />
                                <p>페이스북</p>
                            </button>
                        </div>
                        <div className="share-popup-b">
                            <h3>Page Link</h3>
                            <div className="link"  onClick={copyToClipboard}>
                                <input type="text" value={window.location.href} readOnly />
                                <button>
                                    <span className="material-symbols-rounded">
                                        file_copy
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CampDetails;
