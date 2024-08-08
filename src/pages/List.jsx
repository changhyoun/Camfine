// List.js
import './List.css';
import Header from '../components/Header';
import React, { useEffect, useState, useRef } from 'react';
import { no_list_man, no_list_caution } from '../components/Images';
import axios from 'axios';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { Link, useLocation } from 'react-router-dom';

const CAMPING_API_KEY = process.env.REACT_APP_CAMPING_API_KEY;
const defaultImageUrl = 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const campingTypeMapping = {
    '오토캠핑': '아영장',
    '글램핑': '글램핑',
    '카라반': '카라반',
    '기타': '기타'
};

function List({ campList, setCampList }) {
    const [filteredCampList, setFilteredCampList] = useState([]);
    const [displayedCampList, setDisplayedCampList] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [searchPageNo, setSearchPageNo] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [showCampingType, setShowCampingType] = useState(false);
    const [selectedCampingTypes, setSelectedCampingTypes] = useState([]);
    const observer = useRef();
    const location = useLocation();

    const itemsPerPage = 10;

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const type = queryParams.get('type');
        if (type && campingTypeMapping[type]) {
            setSelectedCampingTypes([type]);
        }
    }, [location.search]);

    useEffect(() => {
        // Swiper initialization
        new Swiper('.swiper-container3', {        
            slidesPerView: 'auto',
            touchRatio: 1,
            simulateTouch: true,
            followFinger: true,
            threshold: 20,
            spaceBetween: 15,
        });

        fetchCampingData(pageNo);
    }, [pageNo]);

    const fetchCampingData = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get('http://apis.data.go.kr/B551011/GoCamping/basedList', {
                params: {
                    ServiceKey: CAMPING_API_KEY,
                    MobileOS: 'ETC',
                    MobileApp: 'AppTest',
                    _type: 'json',
                    numOfRows: 100,
                    pageNo: page
                }
            });
            const newCamps = response.data.response.body.items.item;
            if (newCamps.length === 0) {
                setHasMore(false);
            } else {
                const uniqueCamps = [...new Map(newCamps.map(camp => [camp.contentId, camp])).values()];
                setCampList(prevCampList => [...prevCampList, ...uniqueCamps]);
                setFilteredCampList(prevCampList => [...prevCampList, ...uniqueCamps]);
                setDisplayedCampList(prevDisplayedCampList => [...prevDisplayedCampList, ...uniqueCamps.slice(0, itemsPerPage)]);
            }
        } catch (error) {
            console.error('Error fetching data:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreData = () => {
        if (loading) return;
        if (searchTerm) {
            const nextSearchPageNo = searchPageNo + 1;
            const nextItems = filteredCampList.slice((nextSearchPageNo - 1) * itemsPerPage, nextSearchPageNo * itemsPerPage);
            setDisplayedCampList(prevDisplayedCampList => [...prevDisplayedCampList, ...nextItems]);
            setSearchPageNo(nextSearchPageNo);
        } else {
            setPageNo(prevPageNo => prevPageNo + 1);
        }
    };

    const lastCampElementRef = useRef();
    const lastCampElementObserver = useRef(
        new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !loading && hasMore) {
                loadMoreData();
            }
        })
    );

    useEffect(() => {
        if (lastCampElementRef.current) {
            lastCampElementObserver.current.observe(lastCampElementRef.current);
        }
        return () => {
            if (lastCampElementRef.current) {
                lastCampElementObserver.current.unobserve(lastCampElementRef.current);
            }
        };
    }, [displayedCampList, loading, hasMore]);

    const handleSearch = (e) => {
        e.preventDefault();
        const petFriendlyKeywords = ['애견', '애견 동반', '애견동반', '애견 동', '동반'];
        const isPetFriendlySearch = petFriendlyKeywords.some(keyword => searchTerm.includes(keyword));

        const filteredList = campList.filter(camp => {
            const fieldsToSearch = [
                'facltNm', 'addr1', 'addr2', 'intro', 'featureNm', 
                'doNm', 'sbrsCl', 'lineIntro', 'homepage', 'operDeCl', 
                'operPdCl', 'posblFcltyCl', 'posblFcltyEtc', 'facltDivNm', 'induty', 
                'lctCl', 'sigunguNm', 'themaEnvrnCl'
            ];
            const matchesSearchTerm = fieldsToSearch.some(field => camp[field] && camp[field].includes(searchTerm));
            if (isPetFriendlySearch) {
                return matchesSearchTerm && camp.animalCmgCl === '가능';
            }
            return matchesSearchTerm;
        });

        setFilteredCampList(filteredList);
        setDisplayedCampList(filteredList.slice(0, itemsPerPage));
        setSearchPageNo(1);
        setNoResults(filteredList.length === 0);
    };

    const reloadPage = () => {
        window.location.href = '/list';
    };

    const handleCampingTypeClick = () => {
        setShowCampingType(!showCampingType);
    };

    const handleCampingTypeSelect = (type) => {
        setSelectedCampingTypes(prevSelectedTypes => {
            const newSelectedTypes = prevSelectedTypes.includes(type) 
                ? prevSelectedTypes.filter(t => t !== type)
                : [...prevSelectedTypes, type];
            return newSelectedTypes;
        });
    };

    const handleCampingTypeConfirm = () => {
        setShowCampingType(false);
        if (selectedCampingTypes.length > 0) {
            const filteredList = campList.filter(camp =>
                selectedCampingTypes.some(type => camp.induty.includes(campingTypeMapping[type]))
            );
            setFilteredCampList(filteredList);
            setDisplayedCampList(filteredList.slice(0, itemsPerPage));
            setSearchPageNo(1);
            setNoResults(filteredList.length === 0);
        } else {
            setFilteredCampList(campList);
            setDisplayedCampList(campList.slice(0, itemsPerPage));
            setNoResults(false);
        }
    };

    return (
        <div id="List">
            <Header/>
            <div className="List_main">
                {/* 캠핑 유형 필터 */}
                <div className={`Camping_type ${showCampingType ? 'show' : ''}`}>
                    <button className="close" onClick={() => setShowCampingType(false)}>
                        <span className="material-symbols-rounded">
                            remove
                        </span>
                    </button>
                    <div className="Camping_type_warp">
                        <div className="Camping_type_warp_t">
                            숙소 유형 - ( 복수선택 가능 )
                        </div>
                        <div className="Camping_type_warp_m">
                            <ul>
                                {['오토캠핑', '글램핑', '카라반', '기타'].map(type => (
                                    <li
                                        key={type}
                                        className={selectedCampingTypes.includes(type) ? 'active' : ''}
                                        onClick={() => handleCampingTypeSelect(type)}
                                    >
                                        {type}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="Camping_type_warp_bt">
                            <button onClick={handleCampingTypeConfirm}>
                                확인
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="List_main_warp">
                    <div className="filter_box">
                        <div className="filter_box_warp">
                            <div className="filter_box_t">
                                <form onSubmit={handleSearch}>
                                    <input 
                                        type="text" 
                                        placeholder='캠핑장명을 입력하세요.'
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button type='submit' className="material-symbols-rounded">
                                        search
                                    </button>
                                </form>
                            </div>
                            <div className="filter_box_bt">
                                <div className="swiper-container3">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide filter_box_bt_select" onClick={handleCampingTypeClick}>
                                            {selectedCampingTypes.length > 0 ? selectedCampingTypes.join(', ') : '숙소 유형'}
                                            <span className="material-symbols-rounded">
                                                keyboard_arrow_down
                                            </span>
                                        </div>
                                        <div className="swiper-slide filter_box_bt_select">
                                            지역
                                            <span className="material-symbols-rounded">
                                                keyboard_arrow_down
                                            </span>
                                        </div>
                                        <div className="swiper-slide filter_box_bt_select">
                                            숙소 환경
                                            <span className="material-symbols-rounded">
                                                keyboard_arrow_down
                                            </span>                                            
                                        </div>
                                        <div className="swiper-slide filter_box_bt_select">
                                            주변 환경
                                            <span className="material-symbols-rounded">
                                                keyboard_arrow_down
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="camp_list">
                        <div className="camp_list_warp">
                            {noResults ? (
                                <div className='no_results'>
                                    <div className="no_results_img_warp">
                                        <img src={no_list_man} />
                                        <img src={no_list_caution} />
                                    </div>
                                    <h3>검색결과가 없어요</h3>
                                    <button onClick={reloadPage} className='retry_button'>
                                        다시 찾아보기
                                    </button>
                                </div>
                            ) : (
                                displayedCampList.map((camp, index) => {
                                    const isDefaultImage = camp.firstImageUrl === "" || camp.firstImageUrl === null;
                                    return (
                                        <Link 
                                            to={`/camp/${camp.contentId}`} 
                                            className="camp_list_box" 
                                            key={index}
                                            ref={index === displayedCampList.length - 1 ? lastCampElementRef : null}
                                        >
                                            <img src={isDefaultImage ? defaultImageUrl : camp.firstImageUrl} alt="캠핑장 이미지" />
                                            {isDefaultImage && (
                                                <p className='none'>임시 이미지입니다</p>
                                            )}
                                            <div className="camp_info">
                                                <h3>{camp.facltNm}</h3>
                                                <p>{camp.addr1}</p>
                                            </div>
                                        </Link>
                                    );
                                })
                            )}
                            {loading && 
                            <div className='load_list'>
                                <div className="loader"></div>
                                캠핑장 데이터를 불러오는 중입니다...
                            </div>}
                            {!hasMore && !noResults && 
                            <div className='no_more_data'>
                                캠핑장이 없어요 😅
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default List;
