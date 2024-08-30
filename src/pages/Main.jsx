import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Main.css';
import { main_se1_icon1, main_se1_icon2, main_se1_icon3, main_se1_slide_img1, main_se3_slide_arrow_lt, main_se3_slide_arrow_rt } from '../components/Images';
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

const getChosung = (str) => {
    const cho = [
        'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
        'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    ];
    const choIndex = (ch) => Math.floor((ch.charCodeAt(0) - 44032) / 588);

    return str
        .split('')
        .map(ch => (/[가-힣]/.test(ch) ? cho[choIndex(ch)] : ch))
        .join('');
};

function Main() {
    const [nearbyCampingSites, setNearbyCampingSites] = useState([]);
    const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
    const [noCampingSitesMessage, setNoCampingSitesMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [showSuggestions, setShowSuggestions] = useState(false); 
    const [selectedCampType, setSelectedCampType] = useState('계곡'); // 기본값을 '계곡'으로 설정
    const [filteredCampSites, setFilteredCampSites] = useState([]); // 필터링된 캠핑장 데이터
    const navigate = useNavigate();

    const searchSuggestions = [
        { text: '글램핑', icon: 'camping' },
        { text: '카라반', icon: 'airport_shuttle' },
        { text: '포레스트', icon: 'action_key' },
        { text: '대전', icon: 'share_location' },
        { text: '대구', icon: 'share_location' },
        { text: '서울', icon: 'share_location' },
        { text: '부산', icon: 'share_location' },
    ];

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
                            console.log(`현재 위치 - 위도: ${latitude}, 경도: ${longitude}`);
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
                        console.log(`현재 위치 - 위도: ${latitude}, 경도: ${longitude}`);
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
        if (userLocation.lat && userLocation.lng) {
            fetchCampingSites();
        }
    }, [userLocation]);

    const fetchCampingSites = async (attempts = 3) => {
        try {
            const response = await axios.get('http://apis.data.go.kr/B551011/GoCamping/locationBasedList', {
                params: {
                    ServiceKey: CAMPING_API_KEY,
                    mapX: userLocation.lng,
                    mapY: userLocation.lat,
                    radius: 50000,
                    MobileOS: 'ETC',
                    MobileApp: 'AppTest',
                    _type: 'json'
                }
            });

            console.log('API 응답 데이터:', response.data);

            const items = response.data?.response?.body?.items?.item;
            if (items) {
                const itemsArray = Array.isArray(items) ? items : [items];

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

    // nearbyCampingSites가 변경되면 필터링 수행
    useEffect(() => {
        if (nearbyCampingSites.length > 0) {
            filterCampingSites(selectedCampType);
        }
    }, [nearbyCampingSites]);

    useEffect(() => {
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

    const addLineBreaks = (text, length) => {
        if (text.length <= length) return text;
        const regex = new RegExp(`.{1,${length}}`, 'g');
        return text.match(regex).join('<br />');
    };

    const handleClick = (selectedType) => {
        navigate('/list', { state: { selectedType: selectedType } });
    };

    const handleSlideClick = (id) => {
        navigate(`/camp/${id}`, { state: { campList: nearbyCampingSites } });
    };


    const handleTypeClick = (selectedType) => {
        navigate('/list', { state: { selectedType } });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery) {
            navigate('/searchList', { state: { searchQuery } });
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        setHighlightedIndex(-1);

        if (value) {
            const chosungInput = getChosung(value);
            const filteredSuggestions = searchSuggestions.filter((suggestion) => {
                const chosungText = getChosung(suggestion.text);
                return (
                    suggestion.text.startsWith(value) || 
                    chosungText.startsWith(chosungInput)
                );
            });
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion.text);
        setSuggestions([]);
        setShowSuggestions(false);
        navigate('/searchList', { state: { searchQuery: suggestion.text } });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setHighlightedIndex((prevIndex) =>
                prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (e.key === 'ArrowUp') {
            setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        } else if (e.key === 'Enter') {
            if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
                handleSuggestionClick(suggestions[highlightedIndex]);
            }
        }
    };

    useEffect(() => {
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
            setSearchQuery(suggestions[highlightedIndex].text);
        }
    }, [highlightedIndex, suggestions]);

    const handleFilterClick = (type) => {
        setSelectedCampType(type);
        filterCampingSites(type);
    };

    const filterCampingSites = (type) => {
        let filtered = [];
        if (type === '계곡') {
            filtered = nearbyCampingSites.filter(site => site.posblFcltyCl && site.posblFcltyCl.includes('계곡'));
        } else if (type === '산') {
            filtered = nearbyCampingSites.filter(site => site.posblFcltyCl && site.posblFcltyCl.includes('산'));
        } else if (type === '마트') {
            filtered = nearbyCampingSites.filter(site => site.sbrsCl && site.sbrsCl.includes('마트'));
        }
        setFilteredCampSites(filtered.sort(() => Math.random() - 0.5).slice(0, 2));
    };

    const handleRefreshClick = () => {
        filterCampingSites(selectedCampType);
    };

    return (
        <div id="Main">
            <Header />
            <div className="main">
                <div className="main_warp">
                    <div className="main_se1">
                        {/* 각 유형을 클릭하면 해당 유형의 캠핑장 목록이 필터링됨 */}
                        <div onClick={() => handleTypeClick('오토캠핑')}>
                            <Main_se1_box Main_se1_box_ic={main_se1_icon1} Main_se1_box_tx={'오토캠핑'} />
                        </div>
                        <div onClick={() => handleTypeClick('글램핑')}>
                            <Main_se1_box Main_se1_box_ic={main_se1_icon2} Main_se1_box_tx={'글램핑'} />
                        </div>
                        <div onClick={() => handleTypeClick('카라반')}>
                            <Main_se1_box Main_se1_box_ic={main_se1_icon3} Main_se1_box_tx={'카라반'} />
                        </div>
                    </div>
                    <div className="main_se1_5_search">
                        <form onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                name="searchInput"
                                placeholder='캠핑장을 검색해보세요 ( 예 : 글램핑 )'
                                value={searchQuery}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setShowSuggestions(false)}
                            />
                            <span className="material-symbols-rounded" onClick={handleSearchSubmit}>
                                search
                            </span>
                        </form>
                    </div>
                    <div className={`suggestions-box ${showSuggestions && suggestions.length > 0 ? 'show' : ''}`}>
                        <p>- Popular searches</p>
                        <div className="suggestions-box_warp">
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    className={`suggestion-item ${
                                        index === highlightedIndex ? 'highlighted' : ''
                                    }`}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    <span className="material-symbols-rounded">{suggestion.icon}</span>
                                    {suggestion.text}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="main_se2">
                        <div className="swiper-container">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <Link to={'https://github.com/changhyoun/Camfine'} target='_blank'>
                                        <img src={main_se1_slide_img1} alt="slide" />
                                    </Link>
                                </div>
                                <div className="swiper-slide">
                                    <Link to={'https://github.com/changhyoun/Camfine'}  target='_blank'>
                                        <img src='https://image.ajunews.com/content/image/2019/10/02/20191002111624119007.jpg' alt="slide" />
                                    </Link>
                                </div>
                                <div className="swiper-slide">
                                    <Link to={'https://github.com/changhyoun/Camfine'}  target='_blank'>
                                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFT7EXJs4wS6XEqfytlAAS2b6GQ2pGgw0-gA&s' alt="slide" />
                                    </Link>
                                </div>
                                <div className="swiper-slide">
                                    <Link to={'https://github.com/changhyoun/Camfine'}  target='_blank'>
                                        <img src='https://file.mk.co.kr/meet/neds/2020/11/image_readtop_2020_1181395_16055901934434873.jpg' alt="slide" />
                                    </Link>
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
                                                <div className="swiper-slide" key={index} onClick={() => handleSlideClick(site.contentId)}>
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
                    <div className="main_se4">
                        <div className="main_se4_tx">
                            <div className="main_se4_lt">
                                캠핑장 추천해드려요 🧐 
                            </div>
                            <div className="main_se4_rt">
                                <Link to={'./list'}>
                                더보기
                                <span className="material-symbols-rounded">
                                chevron_right
                                </span>
                                </Link>
                            </div>
                        </div>
                        <div className="main_se4_selectBox">
                            <button 
                                onClick={() => handleFilterClick('계곡')}
                                className={selectedCampType === '계곡' ? 'active' : ''}
                            >
                                🌊 계곡 근처
                            </button>
                            <button 
                                onClick={() => handleFilterClick('산')}
                                className={selectedCampType === '산' ? 'active' : ''}
                            >
                                ⛰️ 산 근처
                            </button>
                            <button 
                                onClick={() => handleFilterClick('마트')}
                                className={selectedCampType === '마트' ? 'active' : ''}
                            >
                                🛒 마트 근처
                            </button>
                            <span  onClick={handleRefreshClick} className="material-symbols-rounded">refresh</span>
                        </div>
                        <div className="main_se4_list_box">
                            {filteredCampSites.length > 0 ? (
                                filteredCampSites.map((site, index) => (
                                    <div className="main_se4_list" key={index}  onClick={() => handleSlideClick(site.contentId)}>
                                        <img src={site.firstImageUrl || defaultImageUrl} alt="campImg" />
                                        <div className="camp-info">
                                            <h3>{site.facltNm}</h3>
                                            <p>{site.addr1}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>해당 유형의 캠핑장이 없습니다.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Main;
