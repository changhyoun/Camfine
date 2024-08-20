import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import { weather_1, weather_2, weather_3, weather_4, weather_5, weather_6, weather_7, weather_not, facebookLogo, xLogo, kakaoLogo } from '../components/Images'; 
import './CampDetails.css';
import DetailFooter from '../components/DetailFooter';

const defaultImageUrl = 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const errorImageUrl = 'https://images.unsplash.com/photo-1652077859695-de2851a95620?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const CampDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const { campList } = location.state || { campList: [] };
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

    const toggleActiveState = () => {
        setIsActive(!isActive);
    };

    const toggleSharePopup = () => {
        setIsSharePopupOpen(!isSharePopupOpen);
    };

    useEffect(() => {
        const campDetailsMain = document.querySelector('.CampDetails_main');
        const shareButtonBox = document.querySelector('.share-button_box');
        const shareButton = document.querySelector('.share-button');

        // 스크롤 이벤트 리스너
        const handleScroll = () => {
            if (campDetailsMain && shareButtonBox && shareButton) {
                const scrollPosition = campDetailsMain.scrollTop;
                const buttonBoxOffset = shareButtonBox.offsetTop;

                if (scrollPosition > buttonBoxOffset) {
                    shareButton.classList.add('scrolled');
                } else {
                    shareButton.classList.remove('scrolled');
                }
            }
        };

        // 스크롤 이벤트 리스너 추가
        if (campDetailsMain) {
            campDetailsMain.addEventListener('scroll', handleScroll);
        }

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            if (campDetailsMain) {
                campDetailsMain.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

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

    useEffect(() => {
        if (campList && campList.length > 0) {
            const foundCamp = campList.find(c => String(c.contentId) === String(id));
            setCamp(foundCamp);
        }
    }, [campList, id]);

    useEffect(() => {
        if (camp) {
            const getWeatherData = async () => {
                const cityName = camp.sigunguNm;
                const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)},KR&appid=${apiKey}&units=metric&lang=kr`;

                try {
                    const response = await axios.get(url);
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
                    const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}월 - ${String(date.getDate()).padStart(2, '0')}일`;
                    const year = `${date.getFullYear()}년`;
                    const dayOfWeek = `${['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][date.getDay()]}`;
                    
                    setFormattedDate(formattedDate);
                    setYear(year);
                    setDayOfWeek(dayOfWeek);
                } catch (error) {
                    console.error('날씨 데이터를 가져오는 중 오류가 발생했습니다.', error);
                    setWeather(null);
                    setTemperature("정보가\n없어요 😅");
                    setHumidity("");
                    setBackgroundImage(null);
                    setWeatherIcon(weather_not); 
                    setShotWeatherIcon('help_outline');
                    setBackgroundImage(`url(${errorImageUrl})`); 
                }
            };

            getWeatherData();
        }
    }, [camp]);

    if (!camp) {
        return <div>캠핑장 정보를 찾을 수 없습니다.</div>;
    }

    const imageUrl = camp.firstImageUrl || defaultImageUrl;
    const hasImage = Boolean(camp.firstImageUrl);
    const region = `${camp.doNm} ${camp.sigunguNm}`;

    const temperatureStyle = temperature === "정보가\n없어요 😅" ? { fontSize: '0.9rem', whiteSpace: 'pre-wrap',textAlign: 'center' } : {}; 
    const humidityStyle = humidity === "" ? { display: 'none' } : {}; 

    return (
        <div id='CampDetails'>
            <Header />
            <div className={`CampDetails_main ${isSharePopupOpen ? 'popup_on' : ''}`}>
                <div className="SearchList_main_warp">
                    <div className="share-button_box">
                        <button className="share-button" onClick={toggleSharePopup}>
                            <span className="material-symbols-rounded">
                                share
                            </span>
                        </button>
                    </div>
                    
                    <div className={`SearchList_main_img ${!hasImage ? 'no-image' : ''}`}>
                        {!hasImage && <p>임시 이미지입니다.</p>}
                        <img src={imageUrl} alt={camp.facltNm} />
                    </div>
                    <div 
                        className={`SearchList_main_weather ${isActive ? 'active' : ''}`} 
                        style={{ backgroundImage }}
                        onClick={toggleActiveState}
                    >
                        <span className="material-symbols-rounded" onClick={toggleActiveState}>
                            {isActive ? 'add' : 'remove'}
                        </span>
                        <div className="SearchList_main_weather_shot">
                            <span className="material-symbols-rounded weather-icon">
                                {shotWeatherIcon}
                            </span>
                            <h4>{region}</h4>
                            <p style={temperatureStyle}>
                            {temperature !== "정보가\n없어요 😅" ? `${temperature}℃` : temperature}</p>
                        </div>
                        <div className="SearchList_main_weather_inner" style={{ display: isActive}}>
                            <div className="SearchList_main_weather_lt">
                                <h2 className="formatted-date">{formattedDate}</h2>
                                <p className="formatted-year-day">{year} | {dayOfWeek}</p>
                            </div>
                            <div className="SearchList_main_weather_rt">
                                <div className="SearchList_main_weather_rt_box">
                                    <div className="SearchList_main_weather_rt_box_top">
                                        {region}
                                    </div>
                                    <div className="SearchList_main_weather_rt_box_bottom">
                                        <div className="SearchList_main_weather_rt_box_bottom_lt">
                                            <h3 style={temperatureStyle}>
                                                {temperature !== "정보가\n없어요 😅" ? `${temperature}℃` : temperature}
                                            </h3>
                                            
                                            <p style={humidityStyle}>습도 : {humidity}%</p>
                                            <p>{weather}</p>
                                        </div>
                                        <div className="SearchList_main_weather_rt_box_bottom_rt">
                                            <img src={weatherIcon} alt="Weather Icon" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                            
                    </div>
                    <h2>{camp.facltNm}</h2>
                    <p>{camp.addr1}</p>
                    <p>{camp.intro}</p>
                </div>
            </div>
           
            <DetailFooter />
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
                                <img src={kakaoLogo} alt="kakaoLogo" />
                                <p>카카오톡</p>
                            </button>
                            <button onClick={shareToTwitter}>
                                <img src={xLogo} alt="xLogo" />
                                <p>X</p>
                            </button>
                            <button onClick={shareToFacebook}>
                                <img src={facebookLogo} alt="facebookLogo" />
                                <p>페이스북</p>
                            </button>
                        </div>
                        <div className="share-popup-b">
                            <h3>Page Link</h3>
                            <div className="link">
                                <input type="text" value={window.location.href} readOnly />
                                <button onClick={copyToClipboard}>
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
